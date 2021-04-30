import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";

export const MATCHES = "matches";
export const matches = ({ fieldValue, args }) => typeof fieldValue == "string" && args.pattern.test(fieldValue);
export const matchesMessageBuilder = ({ fieldName }) => `The field ${fieldName} is match the pattern provided`;

/**
 * @decorator_type **FieldConstraintProcedure**
 *
 * @param pattern
 * @param options
 */
export function Matches(pattern: RegExp, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(MATCHES, options, { pattern }, matches, matchesMessageBuilder);
    return decoratorAdapter(adaptee);
}
