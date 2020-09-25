import { FieldOptionSetterDecoratorFactory } from './factory'


export const optionsSetter = function(optionKey: string, value: any) {
    return FieldOptionSetterDecoratorFactory(optionKey, value);

} 
