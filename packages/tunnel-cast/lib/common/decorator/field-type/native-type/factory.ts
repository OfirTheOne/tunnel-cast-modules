import { BaseFieldOptions } from "../../../../interfaces/public/field-options";
import { embedMetadata } from "../../../../internal/model-metadata/embed-metadata";
import { FieldOptionProcessor } from "../../../../internal/field-option-processor";

export function FieldDefinitionDecoratorFactory<
    FP extends BaseFieldOptions, 
    OP extends FieldOptionProcessor
>(
    options: FP, 
    optionProcessor: OP,
    typeHandlerId: string|symbol,
    ...args: Array<any>
) {
    return function(prototype: any, key: string) {
        const processedOption = optionProcessor.process(options, key);
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            handlerArgs: args, 
            options: processedOption,
            typeHandlerId
        });
    };
}

