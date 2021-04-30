import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../../models/interfaces/field-constraint-fn";

export const INCLUDES = "includes";
export const includes: FieldConstraintFn<{ value: any }> = ({ fieldValue, args }) => {
    return typeof fieldValue == "string" || Array.isArray(fieldValue) ? fieldValue.includes(args.value) : false;
};
export const includesMessageBuilder = ({ fieldName }) =>
    `The includes of the field ${fieldName} dose not match the includes constraint.`;

export function Includes(value: any, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(INCLUDES, options, { value }, includes, includesMessageBuilder);
    return decoratorAdapter(adaptee);
}
