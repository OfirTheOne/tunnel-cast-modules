import { BaseFieldOptions } from "../../../model/field-options";
import { embedMetadata } from "../../model-metadata/embed-metadata";
import { FieldHandler } from "../../field-handler/field-handler";



export function FieldDefinitionDecoratorFactory<OP extends BaseFieldOptions, HC extends FieldHandler<OP>>(
    options: OP, 
    handlerClass: new (...args: any[]) => HC, ...args: Array<any>
) {

    return function(prototype: any, key: string) {
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            fieldHandlerClass: handlerClass, 
            handlerArgs: args, 
            options 
        });
    };
}

