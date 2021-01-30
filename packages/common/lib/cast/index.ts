import "reflect-metadata";

import { globals } from "@tunnel-cast/core/globals";
import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { RegisteredTypeProvider, TypeRegistry } from "@tunnel-cast/core/type-registry";
import {
    FieldEmbeddedData,
    TypeHandlerIdBaseFieldEmbeddedData,
} from "@tunnel-cast/core/interfaces/field-embedded-data";
import { Class } from "@tunnel-cast/core/utils/type-helpers"; //"../../utils/model";
import { VerboseLevel } from "@tunnel-cast/core/utils/logger";
import { extractModelFieldsMap } from "@tunnel-cast/core/utils/model-metadata/extract-metadata";

import { NonTypeFieldHandler } from "../decorator/field-type/non-type";
import { CastResolve } from "../interfaces/cast-resolve";
import { CastOptions } from "../interfaces/cast-options";

export function cast<T>(Model: Class<T>, target: Record<any, any>, options?: CastOptions): CastResolve<T> {
    const logger = globals["LOGGER"];
    const fieldsMap = extractModelFieldsMap(Model);
    const fieldDefinitions = fieldsMap.getMapValues().map((entry) => entry[0]);
    const projectedContext = {};
    const errors = [];

    logger.log(`run cast on "${Model.name}" model, with ${fieldDefinitions.length} definitions`, VerboseLevel.Low);

    for (let def of fieldDefinitions) {
        const typeProvider = "typeHandlerId" in def ? getTypeProviderClass(def.typeHandlerId) : def.provider;
        const handler: FieldHandler = new typeProvider.handlerClass(
            target,
            def.fieldKey,
            projectedContext,
            Model,
            ...(def.handlerArgs || []),
        );

        logger.log(`handling "${def.fieldKey}" field definition`, VerboseLevel.Medium);

        const handlerResult = handler.handle(def.options);
        if ("errors" in handlerResult) {
            logger.log(`error occurred on "${def.fieldKey}" field definition`, VerboseLevel.Medium);

            errors.push(handlerResult);
            if (globals.STOP_ON_FIRST_FAIL) {
                break;
            }
        }
    }

    if (errors.length > 0) {
        return { errors, originValue: target, value: projectedContext as any };
    }

    return { originValue: target, value: Object.assign(new Model(), projectedContext) as T };
}

function getTypeProviderClass(
    typeHandlerId: TypeHandlerIdBaseFieldEmbeddedData["typeHandlerId"],
): RegisteredTypeProvider {
    if (typeHandlerId) {
        return TypeRegistry.getInstance().get(typeHandlerId);
    } else {
        return {
            handlerClass: NonTypeFieldHandler,
        } as RegisteredTypeProvider;
    }
}
