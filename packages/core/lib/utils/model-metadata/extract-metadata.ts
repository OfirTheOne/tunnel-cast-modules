import { Class } from '../../utils/type-helpers';
import { RootMetadataRepoKey } from '../../constants'
import { ModelMetadataRepoNotFoundError } from '../../errors';
import { FieldEmbeddedData } from '../../interfaces/field-embedded-data';



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



export function getFieldDefinitionFromPrototype(prototype: any, key: string, fillEmptyEntry: boolean = true) {
    const map = extractRootRepoFromPrototype(prototype);

    return map.has(key) ? 
        map.get(key) : 
        !fillEmptyEntry ?  
            undefined :
            map.set(key, [{ fieldKey: key, options: {}, typeHandlerId: undefined }]).get(key);
}