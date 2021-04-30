import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";

const IS_OBJECT = "is_object";

const isObject = ({ fieldValue }) => fieldValue != null && fieldValue != undefined && typeof fieldValue == "object";

export function IsObject(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_OBJECT,
        options,
        {},
        isObject,
        ({ fieldName }) => `The field ${fieldName} is not of type object`,
    );
    return decoratorAdapter(adaptee);
}
