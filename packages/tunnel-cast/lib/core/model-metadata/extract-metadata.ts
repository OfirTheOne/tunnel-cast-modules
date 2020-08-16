import { RootMetadataRepoKey } from './../../consts'
import { ModelMetadataRepoNotFoundError } from '../../error';
import { Class } from '../../utils/model';
import { FieldEmbeddedData } from '../../model';



export function extractRootRepo(modelClass: any) {
    return extractRootRepoFromPrototype(modelClass)
}


function extractRootRepoFromPrototype(modelClass: Class<any>) {
    try {
        const rootRepo = modelClass.prototype[RootMetadataRepoKey];
        if(!rootRepo) {
            throw new ModelMetadataRepoNotFoundError(modelClass.name)
        } 
        return rootRepo
    } catch (error) {
        throw error
    }
}



export function getFieldDefinitionFromScheme(prototype: any, key: string) {
    const map = (prototype[RootMetadataRepoKey] as Map<string, [FieldEmbeddedData]>);
    return map.get(key);
}