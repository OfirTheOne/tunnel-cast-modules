import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const MinLength = function (value) {
    return FieldOptionSetterDecoratorFactory("minLength", value);
};

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const MaxLength = function (value) {
    return FieldOptionSetterDecoratorFactory("maxLength", value);
};

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const OfType = function (value) {
    return FieldOptionSetterDecoratorFactory("ofType", value);
};

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const AllowType = function (value) {
    return FieldOptionSetterDecoratorFactory("allowType", value);
};

export const arrayOptionDecorators = {
    MinLength,
    MaxLength,
    OfType,
    AllowType,
};
