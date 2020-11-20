import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const Validations = function(value) {
    return FieldOptionSetterDecoratorFactory('validations', value, true);
} 


