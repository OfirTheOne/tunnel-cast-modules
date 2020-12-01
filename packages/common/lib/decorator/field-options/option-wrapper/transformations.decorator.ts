import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

export const Transformations = function (value) {
    return FieldOptionSetterDecoratorFactory("transformations", value, true);
};
