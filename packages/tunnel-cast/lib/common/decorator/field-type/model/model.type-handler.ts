import { Class } from "../../../../utils/model";
import { NativeValidationDict } from "../../../../interfaces/inner/native-validation-dict";
import { ModelFieldOptions } from "../../../../interfaces";
import { FieldHandler } from "./../../../../core/toolbox/field-handler";
import { TypeRegistry } from '../../../../core/toolbox/type-registry'
import { cast } from '../../../../common/cast'
import { ModelFieldOptionProcessor } from "./model.option-processor";


export const TypeHandlerId = Symbol("MODEL")

export class ModelHandler extends FieldHandler<ModelFieldOptions> {
    public typeName: string;

    nativeValidations: NativeValidationDict<ModelFieldOptions> = {
    };


    constructor(
        context: any,
        fieldName: string,
        projectedContext: any,
        modelParentRef: Class,
        protected modelClass: Class
    ) {
        super(context, fieldName, projectedContext, modelParentRef);
        this.typeName = this.modelClass.name;
    }

    // protected extractValue(options: ModelFieldOptions) {
    //     const value = super.extractValue(options)
    //     const castValue = cast(this.modelClass, value);

    // }

    protected runParsing(value: any, parsing: Function[]) {
        const castValue = cast(this.modelClass, value);
        if ('errors' in castValue) {
            throw castValue.errors
        }
        return super.runParsing(castValue.value, parsing)

    }

    typeCondition(value: any, options: ModelFieldOptions): boolean {
        return typeof value == 'object' && value != null;
    }

    processOption(options: ModelFieldOptions): ModelFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }

    // processError(casteError: any, options: ModelFieldOptions) {

    //     Object.assign(casteError, { options, fieldName: this.fieldName })
    // }
}




