import { BaseFieldOptions } from "../interfaces/field-options";
import { globals } from "../globals";
import { NativeValidationDict, NativeValidationEntry } from "../interfaces/native-validation-dict";

import { VerboseLevel } from '../utils/logger'
import { FieldRequiredError, AssertError, TypeConditionError, NativeValidationError, ProvidedValidationError } from "../errors";
import { Class } from "../utils/type-helpers";


// define description field for api documentation

// create function take the field options and type and create api documentation object


export abstract class FieldHandler<OP extends BaseFieldOptions = BaseFieldOptions> {

    public abstract nativeValidations:  NativeValidationDict<OP>
    public abstract typeName: string;

    protected processedOptions: any;

    constructor(
        protected context: any, 
        protected fieldName: string, 
        protected projectedContext: any,
        protected parentModelRef: Class,

    ) { }
    
    public abstract typeCondition(value: any, options: BaseFieldOptions): boolean;   

    // - main driver
    public handle(options: OP) {

        const logger = globals['LOGGER'];

        let value;
        try {
            const ops = this.processOption(options) as OP;
            this.processedOptions = ops;
            value = this.extractValue(ops);

            const originValueExists = this.applyExistentRestriction(value);

            // == //
            //#region - log
            logger.log(`pass extraction stage`, VerboseLevel.High);
            //#endregion

            if (!originValueExists && ops.required == true) {
                throw new FieldRequiredError(this.fieldName, this.parentModelRef.name); //Error('required failed!');
            }

            // == //
            //#region - log
            logger.log(`pass required-valuation stage`, VerboseLevel.High);
            //#endregion

            // here pass required or nullable

            let projectedValue;
            if (originValueExists) { // if exist
                
                // do assertion
                if(!this.applyAssertion(value, ops)) {
                    throw new AssertError(this.fieldName, this.parentModelRef.name, value ,ops.assert) //Error('type assertion failed!');
                }

                // == //
                //#region - log
                logger.log(`pass assertion stage`, VerboseLevel.High);
                //#endregion

                // do parsing
                projectedValue = this.runParsing(value, ops.parsing as Array<Function>)
                
                // == //
                //#region - log
                logger.log(`pass parsing stage`, VerboseLevel.High);
                //#endregion


                if (!this.typeCondition(projectedValue, ops)) {
                    throw new TypeConditionError(this.fieldName, this.parentModelRef.name, this.typeName);
                }

                // == //
                //#region - log
                logger.log(`pass type-validation stage`, VerboseLevel.High);
                //#endregion

                // run validations
                if (originValueExists) {
                    // run native validations
                    let nativeValidationPass  = this.applyNativeValidation(projectedValue, ops);    
                    if(Array.isArray(nativeValidationPass) && nativeValidationPass.length > 0) {
                        throw new NativeValidationError(nativeValidationPass);
                    }

                    // == //
                    //#region - log
                    logger.log(`pass native-validations stage`, VerboseLevel.High);
                    //#endregion


                    let providedValidationPass: boolean;
                    try {
                        providedValidationPass = this.runValidations(projectedValue, ops.validations as Array<Function>)
                    } catch (error) {
                        throw new ProvidedValidationError(error)
                    }
                    if (!providedValidationPass) {
                        throw new ProvidedValidationError(undefined)
                    }

                    // == //
                    //#region - log
                    logger.log(`pass extra-validations stage`, VerboseLevel.High);
                    //#endregion

                }

                // run transformations
                projectedValue = this.runTransformations(projectedValue, ops.transformations as Array<Function>)

            } else { // if not exist
                // apply default
                projectedValue = ops.default;
                
                // == //
                //#region - log
                logger.log(`assign default value ${projectedValue}`, VerboseLevel.High);
                //#endregion

            }

            this.projectedContext[this.fieldName] = projectedValue;

            // == //
            //#region - log
            logger.log(`assign default value ${projectedValue}`, VerboseLevel.High);
            //#endregion

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
        const logger = globals['LOGGER'];
        let value = this.context[options.attribute];

        if(options.fallbackAttribute) {
            if(!this.applyExistentRestriction(value)) {
                value = this.context[options.fallbackAttribute];
                logger.log(`extract value using attribute ${options.fallbackAttribute}`, VerboseLevel.Medium)
            } else {
                logger.log(`extract value using attribute ${options.attribute}`, VerboseLevel.Medium)
            }
        }

        return value;
    }

    protected applyExistentRestriction(value: any) {
        return (
            value != undefined && 
            value != null
        )
    }

    protected applyAssertion(value: any, options: OP) {
        try {
            const {assert} = options;
            if(assert == undefined) {
                return true;
            } else {
                if(Array.isArray(assert)) {
                    if(!Array.isArray(value)) { // value not an array & and assert is an array --> false
                        return false;
                    } else if(assert.length == 0){ // value is an array & and assert is an empty array --> true
                        return true;
                    } else { // value is an array & and assert is an array of some type  --> true
                        const [arrayAssert,] =  assert
                        if(typeof arrayAssert == 'string') { // primitive type string
                            return value.every(item => typeof item == arrayAssert) 
                        } else { // assert is a class type
                            return value.every(item => item instanceof arrayAssert) 
                        }
                    }
                }  else { // assert is non array type  
    
                    if(typeof assert == 'string') { // primitive type string
                        return typeof value == assert
                    } else { // assert is a class type
                        return value instanceof assert
                    }
                }
            }
        } catch (error) {
            throw error; // TODO : add assert error;
        }

    }

    

    protected applyNativeValidation(value: any, options: OP): boolean | Array<{key: string, message: string}> {

        const validations = Object.keys(options)
            .map(key => ((key in this.nativeValidations) ? [key, this.nativeValidations[key]] : undefined)  as [keyof OP, NativeValidationEntry<OP>] )
            .filter(val => val != undefined ) ;

        const foundErrors = validations
            .map(([key, validation]) => (
                !validation.condition(value, options[key], options)) ? 
                    { message: validation.message as string, key : key as string } : 
                    undefined 
            )
            .filter(val => val != undefined ) ;

        return (foundErrors.length > 0) ? foundErrors : true;
        
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
            fallbackAttribute: options.fallbackAttribute,
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
        errors: Error | Array<Error>,
        fieldName: string,
        value: any,
        options: BaseFieldOptions,
    ) {

        errors = Array.isArray(errors) ? errors : [errors];
        return globals.DEBUG_ERROR ? 
            { errors, fieldName, options, value } :
            { errors }
    }
}
