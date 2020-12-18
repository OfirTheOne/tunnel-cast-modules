import { FieldOptionSetterDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-option-setter.decorator-factory";


export const Format = function (value) {
    return FieldOptionSetterDecoratorFactory("format", value);
};

export const Enums = function (value) {
    return FieldOptionSetterDecoratorFactory("enums", value);
};

export const MinLength = function (value) {
    return FieldOptionSetterDecoratorFactory("minLength", value);
};

export const MaxLength = function (value) {
    return FieldOptionSetterDecoratorFactory("maxLength", value);
};

export const StartsWith = function (value) {
    return FieldOptionSetterDecoratorFactory("startsWith", value);
};

export const EndsWith = function (value) {
    return FieldOptionSetterDecoratorFactory("endsWith", value);
};

export const NotIn = function (value) {
    return FieldOptionSetterDecoratorFactory("notIn", value);
};






export const stringOptionDecorators = {
    Format,
    Enums,
    MinLength,
    MaxLength,
    StartsWith,
    EndsWith,
    NotIn,
};
