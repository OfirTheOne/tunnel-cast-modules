import "reflect-metadata";
import { Class } from "../utils/type-helpers";
import { BaseFieldOptions } from "../interfaces/field-options";
import { embedMetadata } from "../utils/model-metadata/embed-metadata";
import { extractRootRepo } from "../utils/model-metadata/extract-metadata";
import { TypeRegistry } from '../type-registry'

export function FieldModelTypeDecoratorFactory<T>(typeHandlerId: string | symbol ,options?: BaseFieldOptions, model?: Class): PropertyDecorator {
    return function <T>(prototype: any, key: string) {
        const optionsProcessor = TypeRegistry.getInstance().get(typeHandlerId).optionsProcessor
        let type = model ? model : Reflect.getMetadata("design:type", prototype, key);
        const repo = extractRootRepo(type) // will throw if not a valid model

        const processedOptions = optionsProcessor.process(options||{}, key)
        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            handlerArgs: [type], 
            options : processedOptions,
            typeHandlerId // #${type.name}
        });
    };
}



