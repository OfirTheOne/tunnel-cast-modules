import "reflect-metadata";
import { Class } from "../utils/type-helpers";
import { BaseFieldOptions } from "../interfaces/field-options";
import { extractModelFieldsMap } from "../utils/model-metadata/extract-metadata";
import { RegisteredTypeProvider } from "../type-registry";
import { embedFieldTypeMetadata } from "./embed-field-type-metadata";

export function FieldModelTypeDecoratorFactory<T>(
    typeHandlerIdOrProvider: string | symbol | RegisteredTypeProvider,
    options: BaseFieldOptions = {},
    model?: Class,
): PropertyDecorator {
    return function <T>(prototype: any, key: string) {
        let type = model ? model : Reflect.getMetadata("design:type", prototype, key);
        const fieldsMap = extractModelFieldsMap(type); // will throw if not a valid model

        return embedFieldTypeMetadata(prototype, key, typeHandlerIdOrProvider, options, [type]);
    };
}
