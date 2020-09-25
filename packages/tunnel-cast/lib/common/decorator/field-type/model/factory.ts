import "reflect-metadata";
import { Class } from "../../../../utils/model";
import { BaseFieldOptions } from "../../../../model/public/field-options";
import { ModelFieldHandler, FieldTypeId } from "../../../../internal/field-handler/model-handler";
import { embedMetadata } from "../../../../internal/model-metadata/embed-metadata";
import { extractRootRepo } from "../../../../internal/model-metadata/extract-metadata";
import { ModelFieldOptionProcessor } from '../../../../internal/field-option-processor'



const optionProcessor = new ModelFieldOptionProcessor()
export function FieldModelDecoratorFactory<T>(options?: BaseFieldOptions, model?: Class) {
    return function <T>(
        prototype: any,   
        key: string
    ) {
        let type = model ? model : Reflect.getMetadata("design:type", prototype, key);

        const repo = extractRootRepo(type) // will throw if not a valid model

        const processedOptions = optionProcessor.process(options||{}, key)
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            fieldHandlerClass: ModelFieldHandler, 
            handlerArgs: [type], 
            options : processedOptions,
            fieldTypeId: FieldTypeId // #${type.name}
        });
    };
}



