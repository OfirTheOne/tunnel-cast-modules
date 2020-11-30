

import { RootMetadataRepoKey } from '../../constants'
import { FieldEmbeddedData } from '../../interfaces/field-embedded-data';



export function assignRootRepo(prototype: any, metaMap: Map<string, any>) {
    prototype[RootMetadataRepoKey] = metaMap;
}

function assignNewRootRepo(prototype: any) {
    prototype[RootMetadataRepoKey] = prototype[RootMetadataRepoKey] == undefined ? new Map() : prototype[RootMetadataRepoKey];
}


function addFieldDefinitionToScheme(prototype: any, key: string, metadataEntry: FieldEmbeddedData) {
    const map = (prototype[RootMetadataRepoKey] as Map<string, [FieldEmbeddedData]>);
    map.has(key) ? map.get(key).push(metadataEntry) : map.set(key, [metadataEntry]);
}




export function embedMetadata(prototype: any, key: string, metadataEntry: FieldEmbeddedData) {
    assignNewRootRepo(prototype);
    addFieldDefinitionToScheme(prototype, key, metadataEntry);
}


/*
export function embedMetadataOptions(prototype: any, key: string, optionKey: string, optionValue: any) {
    assignRootRepo(prototype);
    const fieldDef = getFieldDefinitionFromScheme(prototype, optionKey);
    if(fieldDef) {
        const fieldOptionValue = fieldDef[0].options[optionKey];
        Array.isArray(fieldOptionValue) ? 
            fieldOptionValue.push(optionValue) : 
            (fieldDef[0].options[optionKey] = optionValue)
    }
}

*/