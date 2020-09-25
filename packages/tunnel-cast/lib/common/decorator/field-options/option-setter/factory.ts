import { getFieldDefinitionFromPrototype } from "../../../../internal/model-metadata/extract-metadata";


export function FieldOptionSetterDecoratorFactory(
    optionKey: string, 
    value: any,
    handlerAsArray: boolean = false
) {
    return function(prototype: any, key: string) {
        const embedData = getFieldDefinitionFromPrototype(prototype, key);
        
        if(embedData) {
            if(handlerAsArray) {
                Array.isArray(embedData[0].options[optionKey]) ? 
                    (embedData[0].options[optionKey]).push(value) : 
                    (embedData[0].options[optionKey] = [value]); 
            } else {
                embedData[0].options[optionKey] = value;

            }
        }
    };
}

