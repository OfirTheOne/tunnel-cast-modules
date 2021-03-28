import { FieldConstraintProcedure } from "../field-decorator-procedure/field-constraint.procedure";
import { FieldConditionalHandlingProcedure } from "../field-decorator-procedure/field-conditional-handling.procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { DefaultWithFn } from "../../models/interfaces/default-with-fn";
import { FieldDefaultAssignmentProcedure } from "../field-decorator-procedure/field-default-assignment.procedure";
import { globalSetting } from "../globals/globals";
import { FieldParserProcedure } from "../field-decorator-procedure/field-parser.procedure";
import { CastOptions } from "../../models/interfaces/cast-options";


/*
// ConditionalHandling = 'CONDITIONAL_HANDLING',
// ExistentsConstraint = 'EXISTENTS_CONSTRAINT',
// DefaultAssignment = 'DEFAULT_ASSIGNMENT',
// Constraint = 'CONSTRAINT',
// Parser = 'PARSER',
Transformer = 'TRANSFORMER',
CustomConstraint = 'CUSTOM_CONSTRAINT',
CustomParser = 'CUSTOM_PARSER',
CustomTransformer = 'CUSTOM_TRANSFORMER',
*/

interface ExecuteFieldProcedureFn<Res, Info = any> {
    (fieldProcedure: FieldProcedure, processedValue: any, target: any, executionInfoCollectionRef: any): Res & { info: Info }
}


const returnProceduresWithTags = (procedures: Array<FieldProcedure>, tags: Array<string>) => 
    !(tags && tags.length) ? procedures : procedures
        .filter(procedure => (procedure.options?.tags == undefined) || tags
            .some( tag => procedure.options.tags
                .includes(tag) ) );



export function executeCastProcedures(field: string, procedures: Partial<Record<FieldProcedureType, FieldProcedure[]>>, target: any, projectedContext: any, options: CastOptions) {
    const fieldValue = target[field]
    const executionInfoCollection: any = {};

    const conditionalHandling = returnProceduresWithTags(procedures[FieldProcedureType.ConditionalHandling] || [], options.tags);
    const conditionalHandlingResult = conditionalHandling.map((cond: FieldConditionalHandlingProcedure) => executeFieldConditionalHandling(cond, fieldValue, target, executionInfoCollection));
    const skipHandling = conditionalHandlingResult.some(cond => cond.conditionPass == false);
    if (skipHandling) {
        projectedContext[field] = fieldValue;
        return [];
    }

    // the first defaultAssignment procedure take in to account.
    const [defaultAssignment,] = (returnProceduresWithTags(procedures[FieldProcedureType.DefaultAssignment] || [], options.tags)) as FieldDefaultAssignmentProcedure[];
    const { isEmpty, defaultValue } = executeFieldDefaultAssignment(defaultAssignment, fieldValue, target, executionInfoCollection);
    if (isEmpty) {
        projectedContext[field] = defaultValue;
        return [];
    }

    const parsers = returnProceduresWithTags(procedures[FieldProcedureType.Parser] || [], options.tags);;
    const parsedFieldValue = parsers
        .reduce((accParseValue, parser: FieldParserProcedure) => 
        executeFieldParser(parser, accParseValue, target, executionInfoCollection).parseValue, fieldValue);

    const constraints = returnProceduresWithTags(procedures[FieldProcedureType.Constraint] || [], options.tags);
    const constraintsResult = constraints
        .map((cons: FieldConstraintProcedure) => executeFieldConstraint(cons, parsedFieldValue, target, executionInfoCollection))
        .filter(({ message }) => message != undefined);
    if (constraintsResult.length == 0) {
        projectedContext[field] = parsedFieldValue;
    }

    return constraintsResult;
}

const executeFieldDefaultAssignment: ExecuteFieldProcedureFn<{ isEmpty?: boolean, defaultValue?: any }>
    = (emptyIdentifierProcedure: FieldDefaultAssignmentProcedure, processedValue: any, context: any, executionInfoCollection: any) => {
        if (!emptyIdentifierProcedure) { return { info: {} }; }
        const fieldValue = processedValue; // emptyIdentifierProcedure?.contextRef[emptyIdentifierProcedure.fieldName]
        const { emptyIdentifier, args, fieldName, defaultWith,
            procedureId, fieldProcedureType, options,
        } = emptyIdentifierProcedure;

        const isEmpty = !emptyIdentifier ? globalSetting.defaultEmptyIdentifier({ args, fieldValue, fieldName, path: fieldName }) : (
            typeof emptyIdentifier == 'function' ?
                emptyIdentifier({ args, fieldValue, fieldName, path: fieldName }) :
                emptyIdentifier.includes(fieldValue)
        );
        const defaultValue = !isEmpty ? undefined : (
            typeof defaultWith == 'function' ?
                (defaultWith as DefaultWithFn)({ args, fieldValue, fieldName, path: fieldName, context }) : defaultWith
        );
        return {
            isEmpty,
            defaultValue,
            info: {
                procedure: emptyIdentifierProcedure, fieldName, procedureId, fieldProcedureType, options, context
            }
        };

    }

const executeFieldConditionalHandling: ExecuteFieldProcedureFn<{ conditionPass: boolean }>
    = (fieldConditionalHandling: FieldConditionalHandlingProcedure, processedValue: any, context: any, executionInfoCollection: any) => {
        const fieldValue = processedValue; // fieldConditionalHandling?.contextRef[fieldConditionalHandling.fieldName]
        const conditionPass = fieldConditionalHandling.condition({
            args: fieldConditionalHandling.args,
            fieldValue,
            fieldName: fieldConditionalHandling.fieldName,
            path: fieldConditionalHandling.fieldName,
            context
        });

        const { procedureId, fieldProcedureType, options, fieldName } = fieldConditionalHandling;
        return {
            conditionPass,
            info: {
                procedure: fieldConditionalHandling, fieldName, procedureId, fieldProcedureType, options, context
            }
        }

    }

const executeFieldConstraint: ExecuteFieldProcedureFn<{ message: string, constraintPass: boolean }>
    = (fieldConstraint: FieldConstraintProcedure, processedValue: any, context: any, executionInfoCollection: any) => {
        const fieldValue = processedValue; //fieldConstraint?.contextRef[fieldConstraint.fieldName];
        const { procedureId, fieldProcedureType, options, fieldName } = fieldConstraint;
        let constraintPass: boolean = undefined, msgValue = fieldValue, msgPath = fieldName;

        if (options?.iterate == true) {
            // TODO : print warning on non iterable types.
            /**
             * run over each items in values array and stop on the first item that fail the constraint. 
             * store it's value and path for messageBuilder.
             */
            const valueIteratableValues = Object.values(fieldValue);
            for (let index = 0; index < valueIteratableValues.length; index++) {
                const currValue = valueIteratableValues[index];
                const currPath = `${fieldName}[${index}]`;
                const currConstraintPass = fieldConstraint.constraint({
                    args: fieldConstraint.args, fieldValue: currValue, fieldName, path: currPath, options, context
                });
                if (currConstraintPass == false) {
                    msgPath = currPath;
                    msgValue = currValue;
                    constraintPass = currConstraintPass;
                    break;
                }
            }
            constraintPass = constraintPass != false;
        } else {
            constraintPass = fieldConstraint.constraint({ args: fieldConstraint.args, fieldValue, fieldName, path: fieldName, options, context });
        }

        let message: string;
        if (!constraintPass) {
            message = typeof fieldConstraint.messageBuilder == 'string' ?
                fieldConstraint.messageBuilder :
                fieldConstraint.messageBuilder({
                    args: fieldConstraint.args, fieldValue: msgValue, fieldName, path: msgPath, options
                });
        }
        return {
            message,
            constraintPass,
            info: { procedure: fieldConstraint, fieldName, procedureId, fieldProcedureType, options, context }
        };

    }

const executeFieldParser: ExecuteFieldProcedureFn<{ parseValue: any }>
    = (fieldParser: FieldParserProcedure, processedValue: any, context: any, executionInfoCollection: any) => {
        const fieldValue = processedValue//fieldParser?.contextRef[fieldParser.fieldName];
        const { procedureId, fieldProcedureType, options, fieldName } = fieldParser;
        const parseValue = fieldParser.parse({ args: fieldParser.args, fieldValue, fieldName, path: fieldName, options, context });
        return {
            parseValue,
            info: { procedure: fieldParser, fieldName, procedureId, fieldProcedureType, options, context }
        };

    }



