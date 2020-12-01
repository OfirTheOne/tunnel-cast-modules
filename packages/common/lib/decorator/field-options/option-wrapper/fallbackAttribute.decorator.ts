import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

export const FallbackAttribute = function (value) {
    return FieldOptionSetterDecoratorFactory("fallbackAttribute", value);
};
