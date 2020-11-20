import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

/**
 * @description set the required status of the field 
 */

export const Required = function(value) {
    return FieldOptionSetterDecoratorFactory('required', value);
} 


