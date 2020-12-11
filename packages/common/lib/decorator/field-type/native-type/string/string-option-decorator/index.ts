import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const Format = function (value) {
    return FieldOptionSetterDecoratorFactory("format", value);
};

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const Enums = function (value) {
    return FieldOptionSetterDecoratorFactory("enums", value);
};

export const stringOptionDecorators = {
    Format,
    Enums,
};
