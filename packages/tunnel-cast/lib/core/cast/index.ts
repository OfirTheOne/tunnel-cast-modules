import 'reflect-metadata';

import { Class } from "../../utils/model";
import { extractRootRepo } from '../model-metadata/extract-metadata'
import { CastResolve } from '../../model/public/cast-resolve';
import { FieldEmbeddedData } from '../../model/inner/field-embedded-data';
import { FieldHandler } from '../../core/field-handler/field-handler';
import { globals } from "../../globals";
import { VerboseLevel } from '../../utils/logger'

export function cast<T>(Model: Class<T>, target: Record<any, any>): CastResolve<T> {

    const logger = globals['LOGGER'];
    const repo: Map<string, Array<FieldEmbeddedData>> = extractRootRepo(Model)
    const fieldDefinitions = getFieldDefinitions(repo).map(entry=> entry[0]);
    const projectedContext = {};
    const errors = [];

    logger.log(`run cast on "${Model.name}" model, with ${fieldDefinitions.length} definitions`, VerboseLevel.Low);

    for(let def of fieldDefinitions) {
        const handler: FieldHandler = new def.fieldHandlerClass(
            target,
            def.fieldKey,
            projectedContext,
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