import { FieldEmbeddedData } from "./field-embedded-data";

export interface ModelInspect {
    globals?: { [key: string]: Array<FieldEmbeddedData> }; 
    definitions: { [key: string]: Array<FieldEmbeddedData> };
    fields: Array<string>,
    name: string,
    serialize(space?: number): string,
}