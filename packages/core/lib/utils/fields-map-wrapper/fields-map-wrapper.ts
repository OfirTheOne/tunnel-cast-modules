import { FieldEmbeddedData } from "../../interfaces/field-embedded-data";

export class FieldsMapWrapper {

    private map: Map<string, [FieldEmbeddedData]>;

    constructor() {
        this.map = new Map();
    }

    getField(key: string, fillEmptyEntry: boolean) {
        return this.map.has(key)
            ? this.map.get(key)
            : !fillEmptyEntry
            ? undefined
            : this.map.set(key, [{ fieldKey: key, options: {}, typeHandlerId: undefined }]).get(key);
    }


    addField(key: string, entry: FieldEmbeddedData): void {
        this.map.has(key) ? this.map.get(key).push(entry) : this.map.set(key, [entry]);
    }
}