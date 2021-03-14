import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";


const IS_BOOLEAN = "is_boolean";

const isBoolean = ({ fieldValue }) => typeof fieldValue == 'boolean';

export function IsBoolean(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_BOOLEAN,
        options,
        [],
        isBoolean,
        ({ fieldName }) => `The field ${fieldName} is not of type boolean`
    );
    return decoratorAdapter(adaptee);
}
