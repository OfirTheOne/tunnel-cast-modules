import "reflect-metadata";
import { Class } from "../../../../utils/model";
import { BaseFieldOptions } from "../../../../model/public/field-options";
import { embedMetadata } from "../../../model-metadata/embed-metadata";
import { ModelFieldHandler, FieldTypeId } from "../../../model-handler";
import { extractRootRepo } from "../../../model-metadata/extract-metadata";
import { ModelFieldOptionProcessor } from './../../../field-option-processor'



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
            fieldTypeId: `${FieldTypeId}#${type.name}`
        });
    };
}



