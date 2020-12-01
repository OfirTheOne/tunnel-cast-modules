import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

/**
 * @description set the default value of the field
 */
export const Default = function (value) {
    return FieldOptionSetterDecoratorFactory("default", value);
};
