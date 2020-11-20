import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

/**
 * @description add parsing function to the field 
 */
export const Parsing = function(value) {
    return FieldOptionSetterDecoratorFactory('parsing', value, true);
} 


