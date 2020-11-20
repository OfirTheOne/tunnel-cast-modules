import "reflect-metadata";
import { Class } from "../../../utils/model";
import { BaseFieldOptions } from "../../../interfaces/public/field-options";
// import { FieldTypeId } from "../../../internal/field-handler/model-handler";
import { embedMetadata } from "../../internal/model-metadata/embed-metadata";
import { extractRootRepo } from "../../internal/model-metadata/extract-metadata";
// import { FieldOptionProcessor } from '../../../core/toolbox/field-option-processor'

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



