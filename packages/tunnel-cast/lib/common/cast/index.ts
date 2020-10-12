import 'reflect-metadata';


import { Class } from "../../utils/model";

import { globals } from "../../globals";
import { VerboseLevel } from '../../utils/logger'

import { FieldHandler } from '../../core/toolbox/field-handler';
import { TypeRegistry } from '../../core/toolbox/type-registry'
import { extractRootRepo } from '../../core/internal/model-metadata/extract-metadata'

import { CastResolve } from '../../interfaces/public/cast-resolve';
import { CastOptions } from '../../interfaces/public/cast-options';
import { FieldEmbeddedData } from '../../interfaces/inner/field-embedded-data';


export function cast<T>(Model: Class<T>, target: Record<any, any>, options? : CastOptions): CastResolve<T> {

    const logger = globals['LOGGER'];
    const repo: Map<string, Array<FieldEmbeddedData>> = extractRootRepo(Model)
    const fieldDefinitions = getFieldDefinitions(repo).map(entry=> entry[0]);
    const projectedContext = {};
    const errors = [];
    
    logger.log(`run cast on "${Model.name}" model, with ${fieldDefinitions.length} definitions`, VerboseLevel.Low);

    for(let def of fieldDefinitions) {
        const typeProvider = TypeRegistry.getInstance().get(def.typeHandlerId)
        const handler: FieldHandler = new typeProvider.handlerClass(
            target,
            def.fieldKey,
            projectedContext,
            Model,
            ...(def.handlerArgs||[])
        );

        logger.log(`handling "${def.fieldKey}" field definition`, VerboseLevel.Medium);
        
        const handlerResult = handler.handle(def.options);
        if('errors' in handlerResult) {
            logger.log(`error occurred on "${def.fieldKey}" field definition`, VerboseLevel.Medium);

            errors.push(handlerResult)
            if(globals.STOP_ON_FIRST_FAIL) {
                break;
            }
        }
    }


    if(errors.length > 0) {
        return { errors, originValue: target, value: projectedContext as any };
    }
    
    return { originValue: target, value: Object.assign(new Model(), projectedContext) as T }
}

function getFieldDefinitions(repo: Map<string, Array<FieldEmbeddedData>>) {

    return Array.from(repo.values())
}