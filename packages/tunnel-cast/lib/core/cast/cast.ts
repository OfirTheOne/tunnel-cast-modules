
import { CAST_FIELD_METADATA, CAST_DECORATED_FIELDS_LIST } from "../../constants";
import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { CastResult } from "../../models/interfaces/cast-result";
import { executeCastProcedures } from "./execute-cast-procedures";
import { CastOptions } from "../../models/interfaces/cast-options";

export function cast<T>(model: (new (...args: any[]) => T), target: any, options: CastOptions = {}): CastResult<T> {

    const modelPrototype = model.prototype;
    const projectedContext = {};
    const decoratedModelFieldsSet: Map<string, number> = Reflect.getMetadata(CAST_DECORATED_FIELDS_LIST, modelPrototype);
    const orderedDecoratedFields = Array
        .from(decoratedModelFieldsSet?.entries() || [])
        .sort(([, v1], [, v2]) => v1 - v2)
        .map(([v]) => v);

    const castProceduresListEntries: Array<[string, FieldProcedure[]]> = orderedDecoratedFields
        .map(field => {
            const faList: Array<FieldProcedure> = Reflect.getMetadata(CAST_FIELD_METADATA, modelPrototype, field);
            // faList.forEach(fa => fa.contextRef = target);
            return [field, faList];
        })

    const allCastResult = castEngine(castProceduresListEntries, target, projectedContext, options);

    const messages = allCastResult.flat().map(({ message }) => message);
    const resolvedValue = messages.length ? undefined : Object.assign(new model(), projectedContext)
    return { resolvedValue, messages };
}

export function castEngine(castProceduresListEntries: Array<[string, FieldProcedure[]]>, target: any, projectedContext: any, options: CastOptions) {
    const messagesLists = castProceduresListEntries.map(([field, proceduresList]) => {
        const proceduresListGroups = proceduresList
            .reduce((gr, procedure) => {
                gr[procedure.fieldProcedureType] = [...(gr[procedure.fieldProcedureType] || []), procedure];
                return gr;
            }, {} as Record<FieldProcedureType, FieldProcedure[]>);

        const proceduresExecutionResult = executeCastProcedures(field, proceduresListGroups, target, projectedContext, options);
        return proceduresExecutionResult;
    });

    return messagesLists
}
