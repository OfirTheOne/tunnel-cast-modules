import { BooleanFieldOptions } from "./i-boolean-options";
import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { Class } from "@tunnel-cast/core/utils/type-helpers";

export const TypeHandlerId = Symbol("BOOLEAN");

export const TypeName = "boolean";

export class BooleanHandler extends FieldHandler<BooleanFieldOptions> {
    public typeName: string = TypeName;

    nativeValidations: NativeValidationDict<BooleanFieldOptions> = {};

    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) {
        super(context, fieldName, projectedContext, parentModelRef);
    }

    typeCondition(): boolean {
        return typeof this.originValue == "boolean";
    }

    processOption(options: BooleanFieldOptions): BooleanFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }
}
