
import { extractRootRepo } from './../model-metadata/extract-metadata';
import { assignRootRepo } from './../model-metadata/embed-metadata';

import { Class } from './../../utils/model';
import { ModelSpec } from '../../model/public/model-spec';
import { serialize } from './serialize'


export function modelSpec(modelClass: Class): ModelSpec {

    const rootRepo = extractRootRepo(modelClass);
    
    const spec: ModelSpec = {
        name: modelClass.name,
        fields: Array.from(rootRepo.keys()),
        definitions: {},
        serialize
    };

    for(let [field, meta] of rootRepo.entries()) {
        spec.definitions[field] = meta;
    }

    return spec
}


function modelSpecToMetaMap(modelSpec: ModelSpec) {
    return modelSpec.fields.reduce((_map, field) => _map.set(field, modelSpec.definitions[field]), new Map())
}


export function specToModel(modelSpec: ModelSpec) {
    let aclass = class Klass {}
    Object.defineProperty(aclass, 'name', modelSpec.name);
    assignRootRepo(aclass.prototype, modelSpecToMetaMap(modelSpec));
    return aclass
}