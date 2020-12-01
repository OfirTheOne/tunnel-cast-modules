import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { Class } from "@tunnel-cast/core/utils/type-helpers";

import { StringFieldOptions } from "./i-string-options";

export const TypeHandlerId = Symbol("STRING");

export const TypeName = "string";

export class StringHandler extends FieldHandler<StringFieldOptions> {
    public typeName: string = TypeName;

    nativeValidations: NativeValidationDict<StringFieldOptions> = {
        format: {
            condition: (value, format) => new RegExp(format).test(value),
            message: "format failed",
        },
        enums: {
            condition: (value, enums) => enums.length == 0 || enums.includes(value),
            message: "enums failed",
        },
    };

    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) {
        super(context, fieldName, projectedContext, parentModelRef);
    }

    typeCondition(value: any, options: StringFieldOptions): boolean {
        return typeof value == "string";
    }

    processOption(options: StringFieldOptions): StringFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }
}
