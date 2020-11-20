import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'

/**
 * @description provide access to the field-type's options object.
 */
export const OptionSetter = function(optionKey: string, value: any) {
    return FieldOptionSetterDecoratorFactory(optionKey, value);

} 
