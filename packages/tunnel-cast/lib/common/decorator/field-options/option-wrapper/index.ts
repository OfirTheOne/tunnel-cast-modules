
import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const assert = function(value) {
    return FieldOptionSetterDecoratorFactory('assert', value);
} 

export const attribute = function(value) {
    return FieldOptionSetterDecoratorFactory('attribute', value);
} 

export const fallbackAttribute = function(value) {
    return FieldOptionSetterDecoratorFactory('fallbackAttribute', value);
} 

export const validate = function(value) {
    return FieldOptionSetterDecoratorFactory('validate', value);
} 

export const required = function(value) {
    return FieldOptionSetterDecoratorFactory('required', value);
} 

export const _default = function(value) {
    return FieldOptionSetterDecoratorFactory('default', value);
} 


export const parsing = function(value) {
    return FieldOptionSetterDecoratorFactory('parsing', value, true);
} 

export const validations = function(value) {
    return FieldOptionSetterDecoratorFactory('validations', value, true);
} 

export const transformations = function(value) {
    return FieldOptionSetterDecoratorFactory('transformations', value, true);
} 




