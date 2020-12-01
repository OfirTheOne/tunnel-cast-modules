import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

export const Validate = function (value) {
    return FieldOptionSetterDecoratorFactory("validate", value);
};
