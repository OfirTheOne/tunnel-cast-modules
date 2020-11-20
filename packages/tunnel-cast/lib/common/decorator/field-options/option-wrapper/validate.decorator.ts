import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

export const Validate = function(value) {
    return FieldOptionSetterDecoratorFactory('validate', value);
} 



