import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";


const IS_ARRAY = "is_array";

const isArray = ({ fieldValue }) => Array.isArray(fieldValue);

export function IsArray(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_ARRAY,
        options,
        {},
        isArray,
        ({ fieldName }) => `The field ${fieldName} is not an array`
    );
    return decoratorAdapter(adaptee);
}
