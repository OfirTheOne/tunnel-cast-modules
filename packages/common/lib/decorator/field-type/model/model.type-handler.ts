import { Class } from "@tunnel-cast/core/utils/type-helpers";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { ModelFieldOptions } from "./i-model-options";
import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { TypeRegistry } from "@tunnel-cast/core/type-registry";
import { cast } from "../../../cast";
import { ModelFieldOptionProcessor } from "./model.option-processor";

export const TypeHandlerId = Symbol("MODEL");

export class ModelHandler extends FieldHandler<ModelFieldOptions> {
    public typeName: string;

    nativeValidations: NativeValidationDict<ModelFieldOptions> = {};

    constructor(
        context: any,
        fieldName: string,
        projectedContext: any,
        modelParentRef: Class,
        protected modelClass: Class,
    ) {
        super(context, fieldName, projectedContext, modelParentRef);
        this.typeName = this.modelClass.name;
    }

    // protected extractValue(options: ModelFieldOptions) {
    //     const value = super.extractValue(options)
    //     const castValue = cast(this.modelClass, value);

    // }

    protected runParsing(parsing: Function[]) {
        const castValue = cast(this.modelClass, this.originValue);
        if ("errors" in castValue) {
            throw castValue.errors;
        }
        return super.runParsing(parsing);
    }

    typeCondition(): boolean {
        return typeof this.originValue == "object" && this.originValue != null;
    }

    processOption(options: ModelFieldOptions): ModelFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }

    // processError(casteError: any, options: ModelFieldOptions) {

    //     Object.assign(casteError, { options, fieldName: this.fieldName })
    // }
}
