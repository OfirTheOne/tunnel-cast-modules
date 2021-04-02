import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";


const IS_NUMBER = "is_number";

const isNumber = ({ fieldValue }) => typeof fieldValue == 'number';

export function IsNumber(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_NUMBER,
        options,
        {},
        isNumber,
        ({ fieldName }) => `The field ${fieldName} is not of type number`
    );
    return decoratorAdapter(adaptee);
}
