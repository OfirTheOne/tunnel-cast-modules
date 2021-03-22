import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";

export const IS_MATCH = "is_match";
export const isMatch = ({ fieldValue, args }) => typeof fieldValue == 'string' && args.pattern.test(fieldValue);
export const isMatchMessageBuilder = ({ fieldName }) => `The field ${fieldName} is match the pattern provided`;


/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param pattern 
 * @param options 
 */
export function IsMatch(pattern: RegExp, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_MATCH,
        options,
        { pattern },
        isMatch,
        isMatchMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
