import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";

export const IS_STRING = "is_string";
export const isString = ({ fieldValue }) => typeof fieldValue == "string";
export const isStringMessageBuilder = ({ fieldName }) => `The field ${fieldName} is not of type string`;

export function IsString(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(IS_STRING, options, {}, isString, isStringMessageBuilder);
    return decoratorAdapter(adaptee);
}
