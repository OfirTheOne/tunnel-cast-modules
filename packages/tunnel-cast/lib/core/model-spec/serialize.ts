import { ModelSpec } from "../../model/model-spec";
import { FieldEmbeddedData } from "../../model/field-embedded-data";

export function serialize(space?: number) {
    const specObject: ModelSpec = this;
    const fromJsonClone = JSON.parse(JSON.stringify(specObject));

    
    for( let field of specObject.fields) {

        specObject.definitions[field].forEach((def, i) => {
            const embeddedData = def as FieldEmbeddedData;
            
            fromJsonClone.definitions[field][i].options['parsing'] = embeddedData.options['parsing']
                .map((f: Function) => `function#${f.name || "Anonymous"}`);
            fromJsonClone.definitions[field][i].options['transformations'] = embeddedData.options['transformations']
                .map((f: Function) => `function#${f.name || "Anonymous"}`);
            fromJsonClone.definitions[field][i].options['validations'] = embeddedData.options['validations']
                .map((f: Function) => `function#${f.name || "Anonymous"}`);
        });
    }
    
    return JSON.stringify(fromJsonClone, undefined, space);
}
