import { RootMetadataRepoKey } from '../../../constants'
import { ModelMetadataRepoNotFoundError } from '../../../error';
import { Class } from '../../../utils/model';
import { FieldEmbeddedData } from '../../../interfaces/inner/field-embedded-data';



export function extractRootRepo(modelClass: any): Map<string, [FieldEmbeddedData]> {
    const rootRepo = extractRootRepoFromPrototype(modelClass.prototype)
    try {
        if(!rootRepo) {
            throw new ModelMetadataRepoNotFoundError(modelClass.name)
        } 
        return rootRepo
    } catch (error) {
        throw error
    }
}


export function extractRootRepoFromPrototype(prototype: Class<any>): Map<string, [FieldEmbeddedData]> {
    return prototype[RootMetadataRepoKey];
}



export function getFieldDefinitionFromPrototype(prototype: any, key: string) {
    const map = extractRootRepoFromPrototype(prototype);
    return map.get(key);
}