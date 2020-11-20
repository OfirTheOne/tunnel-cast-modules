import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const AssertType = function(value) {
    return FieldOptionSetterDecoratorFactory('assert', value);
} 

