import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { Class } from "@tunnel-cast/core/utils/type-helpers";

import { ArrayFieldOptions } from "./i-array-options";

export const TypeName = "array";

export const TypeHandlerId = Symbol("ARRAY");

export class ArrayHandler extends FieldHandler<ArrayFieldOptions> {
    public typeName: string = TypeName;

    nativeValidations: NativeValidationDict<ArrayFieldOptions> = {
        /**
         * todo description
         */
        maxLength: {
            condition: (value, maxLength) => value.length < maxLength,
            message: "maxLength failed",
        },
        /**
         * todo description
         */
        minLength: {
            condition: (value, minLength) => value.length >= minLength,
            message: "minLength failed",
        },
        /**
         * todo description
         */
        ofType: {
            condition: (value, ofType) => value.every((item) => typeof item == ofType),
            message: "ofType failed",
        },
        /**
         * todo description
         */
        allowType: {
            condition: (value, allowType) =>
                allowType.length == 0 || value.every((item) => allowType.includes(typeof item as any)),
            message: "allowType failed",
        },
    };

    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) {
        super(context, fieldName, projectedContext, parentModelRef);
    }

    typeCondition(): boolean {
        return Array.isArray(this.parsedValue);
    }

    processOption(options: ArrayFieldOptions): ArrayFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }
}
