import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";


const IS_STRING_NUMBER = "is_string_number";

export function IsStringNumber(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_STRING_NUMBER,
        options,
        [],
        ({ fieldValue }) => typeof fieldValue == 'string' && /^\d+/.test(fieldValue),
        ({ fieldName }) => `The field ${fieldName} is not a string number`
    );
    return decoratorAdapter(adaptee);
}
