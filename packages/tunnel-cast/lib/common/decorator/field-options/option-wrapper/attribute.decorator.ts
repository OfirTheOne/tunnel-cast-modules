import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const Attribute = function(value) {
    return FieldOptionSetterDecoratorFactory('attribute', value);
} 
