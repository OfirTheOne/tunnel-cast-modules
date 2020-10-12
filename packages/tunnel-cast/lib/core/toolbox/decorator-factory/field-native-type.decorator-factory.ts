import { BaseFieldOptions } from "../../../interfaces/public/field-options";
import { embedMetadata } from "../../../internal/model-metadata/embed-metadata";
import { FieldOptionProcessor } from "../field-option-processor";
import { TypeRegistry } from '../../toolbox/type-registry'

export function FieldNativeTypeDecoratorFactory<
    FP extends BaseFieldOptions, 
>(
    options: FP, 
    typeHandlerId: string|symbol,
    ...args: Array<any>
) {
    return function(prototype: any, key: string) {
        const optionProcessor: FieldOptionProcessor = TypeRegistry.getInstance().get(typeHandlerId).optionsProcessor
        const processedOption = optionProcessor.process(options, key);
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            handlerArgs: args, 
            options: processedOption,
            typeHandlerId
        });
    };
}

