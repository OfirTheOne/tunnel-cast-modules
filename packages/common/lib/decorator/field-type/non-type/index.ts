import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";

export const TypeHandlerId = Symbol("NON_TYPE");

export const TypeName = "non-type";

export class NonTypeFieldHandler extends FieldHandler {
    public nativeValidations: NativeValidationDict<BaseFieldOptions>;
    public typeName: string = TypeName;
    public typeCondition(value: any, options: BaseFieldOptions): boolean {
        throw new Error("Method not implemented.");
    }
}
