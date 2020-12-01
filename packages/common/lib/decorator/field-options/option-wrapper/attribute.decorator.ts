import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

export const Attribute = function (value) {
    return FieldOptionSetterDecoratorFactory("attribute", value);
};
