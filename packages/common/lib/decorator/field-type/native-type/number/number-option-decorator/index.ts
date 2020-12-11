import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const Min = function (value) {
    return FieldOptionSetterDecoratorFactory("min", value);
};

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const Max = function (value) {
    return FieldOptionSetterDecoratorFactory("max", value);
};

export const numberOptionDecorators = {
    Min,
    Max,
};
