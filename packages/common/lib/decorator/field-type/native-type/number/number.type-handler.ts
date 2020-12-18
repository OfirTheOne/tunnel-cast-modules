import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { NumberFieldOptions } from "./i-number-options";
import { Class } from "@tunnel-cast/core/utils/type-helpers";
import { nativeValidations } from './number-native-validation';

export const TypeHandlerId = Symbol("NUMBER");

export const TypeName = "number";

export class NumberHandler extends FieldHandler<NumberFieldOptions> {
    public typeName: string = TypeName;

    nativeValidations = nativeValidations;

    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) {
        super(context, fieldName, projectedContext, parentModelRef);
    }

    typeCondition(): boolean {
        return typeof this.parsedValue == "number";
    }

    processOption(options: NumberFieldOptions): NumberFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions };
    }
}
