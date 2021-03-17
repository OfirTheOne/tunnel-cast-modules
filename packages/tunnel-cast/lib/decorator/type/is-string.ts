import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";


const IS_STRING = "is_string";

const isString = ({ fieldValue }) => typeof fieldValue == 'string';

export function IsString(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_STRING,
        options,
        {},
        isString,
        ({ fieldName }) => `The field ${fieldName} is not of type string`
    );
    return decoratorAdapter(adaptee);
}
