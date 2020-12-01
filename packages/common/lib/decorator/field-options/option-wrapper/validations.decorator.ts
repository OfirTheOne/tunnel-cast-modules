import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

export const Validations = function (value) {
    return FieldOptionSetterDecoratorFactory("validations", value, true);
};
