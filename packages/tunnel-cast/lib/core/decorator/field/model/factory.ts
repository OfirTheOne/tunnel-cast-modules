import "reflect-metadata";
import { BaseFieldOptions } from "../../../../model/field-options";
import { embedMetadata } from "../../../model-metadata/embed-metadata";
import { ModelFieldHandler } from "../../../model-handler";
import { extractRootRepo } from "../../../model-metadata/extract-metadata";
import { Class } from "../../../../utils/model";




export function FieldModelDecoratorFactory<T>(options?: BaseFieldOptions, model?: Class) {
    return function <T>(
        prototype: any,   
        key: string
    ) {
        let type = model ? model : Reflect.getMetadata("design:type", prototype, key);

        const repo = extractRootRepo(type) // will throw if not a valid model

        return embedMetadata(prototype, key,  { 
            fieldKey: key, 
            fieldHandlerClass: ModelFieldHandler, 
            handlerArgs: [type], 
            options 
        });
    };
}



