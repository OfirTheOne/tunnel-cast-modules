import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const Transformations = function(value) {
    return FieldOptionSetterDecoratorFactory('transformations', value, true);
} 



