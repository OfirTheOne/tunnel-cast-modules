import { FieldConstraintProcedure } from "../field-decorator-procedure/field-constraint.procedure";
import { FieldConditionalHandlingProcedure } from "../field-decorator-procedure/field-conditional-handling.procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldDefaultAssignmentProcedure } from "../field-decorator-procedure/field-default-assignment.procedure";
import { globalSetting } from "../globals/globals";


/*
// ConditionalHandling = 'CONDITIONAL_HANDLING',
// ExistentsConstraint = 'EXISTENTS_CONSTRAINT',
// DefaultAssignment = 'DEFAULT_ASSIGNMENT',
// Constraint = 'CONSTRAINT',
CustomConstraint = 'CUSTOM_CONSTRAINT',
Parser = 'PARSER',
CustomParser = 'CUSTOM_PARSER',
Transformer = 'TRANSFORMER',
CustomTransformer = 'CUSTOM_TRANSFORMER',
*/



export function executeCastProcedures(field: string, procedures: Partial<Record<FieldProcedureType, FieldProcedure[]>>, target: any, projectedContext: any, options?: any) {
    const fieldValue = target[field]

    const conditionalHandling = procedures[FieldProcedureType.ConditionalHandling]||[];
    const conditionalHandlingResult = conditionalHandling.map((cond: FieldConditionalHandlingProcedure) => executeFieldConditionalHandling(cond));
    const skipHandling = conditionalHandlingResult.some(cond => cond.conditionPass == false);
    if(skipHandling) {
        projectedContext[field] = fieldValue;
        return [];
    }

    // the first defaultAssignment procedure take in to account.
    const [defaultAssignment, ] = (procedures[FieldProcedureType.DefaultAssignment]||[]) as FieldDefaultAssignmentProcedure[];
    const { isEmpty, defaultValue } = executeFieldDefaultAssignment(defaultAssignment)
    if(isEmpty) {
        projectedContext[field] = defaultValue;
        return [];
    }

    const constraints = procedures[FieldProcedureType.Constraint]||[];
    const constraintsResult = constraints
        .map((cons: FieldConstraintProcedure) => executeFieldConstraint(cons))
        .filter(({message}) => message != undefined );
    if(constraintsResult.length == 0) {
        projectedContext[field] = fieldValue;
    }

    return constraintsResult;
}

function executeFieldDefaultAssignment(emptyIdentifierProcedure: FieldDefaultAssignmentProcedure) {
    if(!emptyIdentifierProcedure) { return  {}; }
    const fieldValue = emptyIdentifierProcedure?.contextRef[emptyIdentifierProcedure.fieldName]
    const { emptyIdentifier, args, fieldName, defaultWith,
            procedureId, fieldProcedureType, options, contextRef
    } = emptyIdentifierProcedure;
    
    const isEmpty = !emptyIdentifier ? globalSetting.defaultEmptyIdentifier({args, fieldValue, fieldName, path: fieldName}) : (
        typeof emptyIdentifier == 'function' ? 
            emptyIdentifier({ args, fieldValue, fieldName, path: fieldName}) : 
            emptyIdentifier.includes(fieldValue)
    );
    const defaultValue = !isEmpty ? undefined : (
        typeof defaultWith == 'function' ?  
            defaultWith({ args, fieldValue, fieldName, path: fieldName }) : defaultWith
    );
    return {
        isEmpty,
        defaultValue,
        info: {
            procedure: emptyIdentifierProcedure, fieldName, procedureId, fieldProcedureType, options, contextRef 
        }
    };

}

function executeFieldConditionalHandling(fieldConditionalHandling: FieldConditionalHandlingProcedure) {
    const fieldValue = fieldConditionalHandling?.contextRef[fieldConditionalHandling.fieldName]
    const conditionPass = fieldConditionalHandling.condition({
        args: fieldConditionalHandling.args,
        fieldValue,
        fieldName: fieldConditionalHandling.fieldName,
        path: fieldConditionalHandling.fieldName,
        context: fieldConditionalHandling.contextRef
    });

    const { procedureId, fieldProcedureType, options, contextRef, fieldName } = fieldConditionalHandling;
    return {
        conditionPass,
        info: {
            procedure: fieldConditionalHandling, fieldName, procedureId, fieldProcedureType, options, contextRef 
        }
    }

}

function executeFieldConstraint(fieldConstraint: FieldConstraintProcedure) {
    const fieldValue = fieldConstraint?.contextRef[fieldConstraint.fieldName];
    const { procedureId, fieldProcedureType, options, contextRef, fieldName } = fieldConstraint;
    let constraintPass: boolean = undefined, msgValue = fieldValue, msgPath = fieldName;

    if(options?.iterate == true) {
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
                args: fieldConstraint.args, fieldValue: currValue, fieldName: fieldConstraint.fieldName, path: currPath, options,
            });
            if(currConstraintPass == false) {
                msgPath = currPath;
                msgValue = currValue;
                constraintPass = currConstraintPass;
                break;
            }
        }
        constraintPass = constraintPass != false;
    } else {
        constraintPass = fieldConstraint.constraint({args: fieldConstraint.args, fieldValue, fieldName, path: fieldName, options});
    }

    let message: string;
    if(!constraintPass) {
        message = typeof fieldConstraint.messageBuilder == 'string' ? 
            fieldConstraint.messageBuilder : 
            fieldConstraint.messageBuilder({
                args: fieldConstraint.args, fieldValue: msgValue, fieldName, path: msgPath, options
            });
    }
    return {
        message,
        constraintPass,
        info: { procedure: fieldConstraint, fieldName, procedureId, fieldProcedureType, options, contextRef }
    };

}


