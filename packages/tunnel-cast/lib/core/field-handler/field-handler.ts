import { BaseFieldOptions } from "../../model";
import { globals } from "../../globals";
import { NativeValidationDict, NativeValidationEntry } from "../../model/native-validation-dict";



// define description field for api documentation

// create function take the field options and type and create api documentation object


export abstract class FieldHandler<OP extends BaseFieldOptions = BaseFieldOptions> {

    public abstract nativeValidations:  NativeValidationDict<OP>

    constructor(protected context: any, protected fieldName: string, protected projectedContext: any) { }
    
    public abstract typeCondition(value: any, options: BaseFieldOptions): boolean

    
    // - main driver
    public handle(options: OP) {
        let value;
        try {
            const ops  = this.processOption(options) as OP;
            value = this.extractValue(ops);

            const originValueExists = this.applyExistentRestriction(value);

            if (!originValueExists && ops.required == true) {
                throw Error('required failed!');
            }

            // here pass required or nullable

            let projectedValue;
            if (originValueExists) { // if exist
                // do parsing
                projectedValue = this.runParsing(value, ops.parsing as Array<Function>)

                // run native validations


                if (!this.typeCondition(projectedValue, ops)) {
                    throw Error('type validation failed!');
                }

                // run validations
                if (originValueExists) {
                    const nativeValidationPass = this.applyNativeValidation(projectedValue, ops)
                    if (!nativeValidationPass) {
                        throw Error('native validations failed!');
                    }

                    const providedValidationPass = this.runValidations(projectedValue, ops.validations as Array<Function>)
                    if (!providedValidationPass) {
                        throw Error('provided validations failed!');
                    }
                }

                // run transformations
                projectedValue = this.runTransformations(projectedValue, ops.transformations as Array<Function>)

            } else { // if not exist
                // apply default
                projectedValue = ops.default
            }

            this.projectedContext[this.fieldName] = projectedValue

            return {
                context: this.context,
                projectedContext: this.projectedContext,
                fieldName: this.fieldName
            }
        } catch (error) {
            return this.buildError(
                error,
                this.fieldName,
                value,
                options
            )
        }
    }

    // #region == apply in-house base logic
    protected extractValue(options: BaseFieldOptions): any {
        const value = this.context[options.attribute];
        return value;
    }

    protected applyExistentRestriction(value: any) {
        return (
            value != undefined && 
            value != null
        )
    }

    protected applyNativeValidation(value: any, options: OP): boolean {

        const validations = Object.keys(options)
            .map(key => ((key in this.nativeValidations) ? [key, this.nativeValidations[key]] : undefined)  as [keyof OP, NativeValidationEntry<OP>] )
            .filter(val => val != undefined ) ;

        const foundErrors = validations
            .map(([key, validation]) => (!validation.condition(value, options[key], options)) ?  validation.message as string : undefined )
            .filter(val => val != undefined ) ;

        if(foundErrors.length > 0) {
            throw foundErrors;
        }

        return true;
        
    }
    // #endregion

    // #region == apply provided logic
    protected runParsing(value: any, parsing: Array<Function>) {
        const parsedValue = parsing.length == 0 ? 
            value : 
            parsing.reduce((val, pFunc) => pFunc(val), value);
        return parsedValue;
    }

    protected runValidations(value: any, validations: Array<Function>) {

        let validationPass = true;
        for (let validation of validations) {
            validationPass = validation(value);
            if (!validationPass) {
                break;
            }
        }
        return validationPass;
    }

    protected runTransformations(value: any, transformations: Array<Function>) {
        const transformedValue = transformations.length == 0 ? 
            value : 
            transformations.reduce((val, tFunc) => tFunc(val), value);
        return transformedValue;
    }
    // #endregion 


    protected processOption(options: OP): BaseFieldOptions {
        let required = options.required == undefined ?
            (options.nullable != undefined ? !options.nullable : globals.FIELD_REQUIRED_DEFAULT) :
            options.required;

        let nullable = !required

        return {
            attribute: options.attribute || this.fieldName,
            validate: options.validate,
            transformations: options.transformations || [],
            validations: options.validations || [],
            parsing: options.parsing || [],
            required,
            nullable,
            nullableIf: options.nullableIf,
            requiredIf: options.requiredIf,
            error: options.error,
            default: options.default
        }
    }

    protected buildError(
        error: Error,
        fieldName: string,
        value: any,
        options: BaseFieldOptions,
    ) {
        return globals.DEBUG_ERROR ? 
            { error, fieldName, options, value } :
            { error }
    }
}
