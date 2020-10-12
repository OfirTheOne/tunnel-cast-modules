import { FieldOptionSetterDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-option-setter.decorator-factory'


export const optionsSetter = function(optionKey: string, value: any) {
    return FieldOptionSetterDecoratorFactory(optionKey, value);

} 
