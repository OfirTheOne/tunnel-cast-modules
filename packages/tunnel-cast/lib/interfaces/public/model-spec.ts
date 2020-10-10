import { FieldEmbeddedData } from "../inner/field-embedded-data";

export interface ModelSpec {
    globals?: { [key: string]: Array<FieldEmbeddedData> }; 
    definitions: { [key: string]: Array<FieldEmbeddedData> };
    fields: Array<string>,
    name: string,
    serialize(space?: number): string,
}