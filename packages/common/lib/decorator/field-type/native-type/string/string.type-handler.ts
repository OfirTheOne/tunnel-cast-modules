import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { Class } from "@tunnel-cast/core/utils/type-helpers";

import { StringFieldOptions } from "./i-string-options";
import { nativeValidations } from "./string-native-validation";

export const TypeHandlerId = Symbol("STRING");

export const TypeName = "string";

export class StringHandler extends FieldHandler<StringFieldOptions> {
    public typeName: string = TypeName;

    nativeValidations = nativeValidations;

    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) {
        super(context, fieldName, projectedContext, parentModelRef);
    }

    typeCondition(): boolean {
        return typeof this.parsedValue == "string";
    }

    processOption(options: StringFieldOptions): StringFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }
}
