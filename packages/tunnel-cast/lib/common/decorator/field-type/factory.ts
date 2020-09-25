import { BaseFieldOptions } from "../../../model/public/field-options";
import { embedMetadata } from "../../../internal/model-metadata/embed-metadata";
import { FieldHandler } from "../../../internal/field-handler/field-handler";
import { FieldOptionProcessor } from "../../../internal/field-option-processor";

import { Class } from '../../../utils/model'

export function FieldDefinitionDecoratorFactory<
    FP extends BaseFieldOptions, 
    HC extends FieldHandler<FP>,
    OP extends FieldOptionProcessor
>(
    options: FP, 
    handlerClass: Class<HC>, 
    optionProcessor: OP,
    fieldTypeId: string|symbol,
    ...args: Array<any>
) {
    return function(prototype: any, key: string) {
        const processedOption = optionProcessor.process(options, key);
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            fieldHandlerClass: handlerClass, 
            handlerArgs: args, 
            options: processedOption,
            fieldTypeId
        });
    };
}

