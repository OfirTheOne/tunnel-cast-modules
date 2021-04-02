import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";

export const IS_BOOLEAN = "is_boolean";
export const isBoolean = ({ fieldValue }) => typeof fieldValue == 'boolean';
export const isBooleanMessageBuilder = ({ fieldName }) => `The field ${fieldName} is not of type boolean`;

export function IsBoolean(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_BOOLEAN,
        options,
        {},
        isBoolean,
        isBooleanMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
