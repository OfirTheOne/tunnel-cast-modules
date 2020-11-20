import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const FallbackAttribute = function(value) {
    return FieldOptionSetterDecoratorFactory('fallbackAttribute', value);
} 
