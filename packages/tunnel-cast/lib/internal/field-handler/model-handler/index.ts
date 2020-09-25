import { Class } from "../../../utils/model";
import { FieldHandler } from "../field-handler";
import { NativeValidationDict } from "../../../model/inner/native-validation-dict";
import { BaseFieldOptions, ModelFieldOptions } from "../../../model";
import { cast } from '../../../common/cast'
import { TypeRegistry } from '../../type-registry'


export const FieldTypeId = Symbol("MODEL")

export class ModelFieldHandler extends FieldHandler<ModelFieldOptions> {

    nativeValidations: NativeValidationDict<ModelFieldOptions> = {
    };


    constructor(
        context: any,
        fieldName: string,
        projectedContext: any,
        modelParentRef: Class,
        protected modelClass: Class
    ) {
        super(context, fieldName, projectedContext, modelParentRef)
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


TypeRegistry
    .fetch()
    .register(FieldTypeId, ModelFieldHandler);



