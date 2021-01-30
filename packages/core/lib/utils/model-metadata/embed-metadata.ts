import "reflect-metadata";
import { MODEL_FIELDS_MAP } from "../../constants/model-fields-map";
import { FieldEmbeddedData } from "../../interfaces/field-embedded-data";
import { FieldsMapWrapper } from "./../fields-map-wrapper";

export function assignModelFieldsMapIfNotExist(prototype: any, mapWrapper: FieldsMapWrapper = new FieldsMapWrapper()) {
    if (!Reflect.hasMetadata(MODEL_FIELDS_MAP, prototype)) {
        Reflect.defineMetadata(MODEL_FIELDS_MAP, mapWrapper, prototype);
    }
}

function defineFieldDefinition(prototype: any, key: string, metadataEntry: FieldEmbeddedData): void {
    const mapWrapper = Reflect.getMetadata(MODEL_FIELDS_MAP, prototype) as FieldsMapWrapper; // Map<string, [FieldEmbeddedData]>;
    mapWrapper.addField(key, metadataEntry); // map.has(key) ? map.get(key).push(metadataEntry) : map.set(key, [metadataEntry]);
}

export function insertFieldDefinition(prototype: any, key: string, metadataEntry: FieldEmbeddedData): void {
    assignModelFieldsMapIfNotExist(prototype);
    defineFieldDefinition(prototype, key, metadataEntry);
}
