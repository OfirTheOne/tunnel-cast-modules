import { RootMetadataRepoKey } from '../../../constants'
import { ModelMetadataRepoNotFoundError } from '../../../error';
import { Class } from '../../../utils/model';
import { FieldEmbeddedData } from '../../../interfaces/inner/field-embedded-data';



export function extractRootRepo(modelClass: any): Map<string, [FieldEmbeddedData]> {
    return extractRootRepoFromPrototype(modelClass.prototype)
}


export function extractRootRepoFromPrototype(prototype: Class<any>): Map<string, [FieldEmbeddedData]> {
    const rootRepo = prototype[RootMetadataRepoKey];
    try {
        if(!rootRepo) {
            throw new ModelMetadataRepoNotFoundError(prototype?.['constructor'].name)
        } 
        return rootRepo
    } catch (error) {
        throw error
    }
}



export function getFieldDefinitionFromPrototype(prototype: any, key: string) {
    const map = extractRootRepoFromPrototype(prototype);
    return map.get(key);
}