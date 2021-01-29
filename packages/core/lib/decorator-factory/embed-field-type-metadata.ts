import { FieldOptionProcessor } from "../field-option-processor";
import { FieldEmbeddedData } from "../interfaces/field-embedded-data";
import { BaseFieldOptions } from "../interfaces/field-options";
import { RegisteredTypeProvider, TypeRegistry } from "../type-registry";
import { insertFieldDefinition } from "../utils/model-metadata/embed-metadata";

export function embedFieldTypeMetadata(
    prototype: any,
    key: string,
    typeHandlerIdOrProvider: string | symbol | RegisteredTypeProvider,
    options: BaseFieldOptions = {},
    args: Array<any> = [],
) {
    let fieldData: FieldEmbeddedData;
    if (typeof typeHandlerIdOrProvider == "object") {
        const optionProcessor: FieldOptionProcessor = typeHandlerIdOrProvider.optionsProcessor;
        const processedOption = optionProcessor.process(options, key);
        fieldData = {
            fieldKey: key,
            handlerArgs: args,
            options: processedOption,
            provider: typeHandlerIdOrProvider,
        };
    } else {
        const optionProcessor: FieldOptionProcessor = TypeRegistry.getInstance().get(typeHandlerIdOrProvider)
            .optionsProcessor;
        const processedOption = optionProcessor.process(options, key);
        fieldData = {
            fieldKey: key,
            handlerArgs: args,
            options: processedOption,
            typeHandlerId: typeHandlerIdOrProvider,
        };
    }

    return insertFieldDefinition(prototype, key, fieldData);
}
