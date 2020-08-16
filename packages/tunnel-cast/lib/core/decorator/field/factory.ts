import { BaseFieldOptions } from "../../../model/field-options";
import { embedMetadata } from "../../model-metadata/embed-metadata";
import { FieldHandler } from "../../field-handler/field-handler";
import { FieldOptionProcessor } from "../../field-option-processor";


export function FieldDefinitionDecoratorFactory<
    FP extends BaseFieldOptions, 
    HC extends FieldHandler<FP>,
    OP extends FieldOptionProcessor
>(
    options: FP, 
    handlerClass: new (...args: any[]) => HC, 
    optionProcessor: OP,
    ...args: Array<any>
) {
    return function(prototype: any, key: string) {
        const processedOption = optionProcessor.process(options, key);
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            fieldHandlerClass: handlerClass, 
            handlerArgs: args, 
            options: processedOption
        });
    };
}

