import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";

export const IS_NUMBER_STRING = "is_string_number";
export const isNumberString = ({ fieldValue }) => typeof fieldValue == 'string' && /^\d+/.test(fieldValue);
export const isNumberStringMessageBuilder = ({ fieldName }) => `The field ${fieldName} is not a string number`;

/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param options 
 */
export function IsNumberString(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_NUMBER_STRING,
        options,
        {},
        isNumberString,
        isNumberStringMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
