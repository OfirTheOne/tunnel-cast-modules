import "reflect-metadata";
import { ModelMetadataRepoNotFoundError } from "../../errors";
import { MODEL_FIELDS_MAP } from "../../constants/model-fields-map";
import { FieldsMapWrapper } from "../fields-map-wrapper";

export function extractModelFieldsMap(modelClass: any): FieldsMapWrapper {
    return extractModelFieldsMapFromPrototype(modelClass.prototype);
}

export function extractModelFieldsMapFromPrototype(prototype: any): FieldsMapWrapper {
    const mapWrapper = Reflect.getMetadata(MODEL_FIELDS_MAP, prototype);

    try {
        if (!mapWrapper) {
            throw new ModelMetadataRepoNotFoundError(prototype?.["constructor"].name);
        }
        return mapWrapper;
    } catch (error) {
        throw error;
    }
}

export function getFieldDefinitionFromPrototype(prototype: any, key: string, fillEmptyEntry: boolean = true) {
    const mapWrapper = extractModelFieldsMapFromPrototype(prototype);
    return mapWrapper.getField(key, fillEmptyEntry);
}
