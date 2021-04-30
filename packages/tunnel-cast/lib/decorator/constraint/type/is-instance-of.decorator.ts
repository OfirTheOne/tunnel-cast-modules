import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { FieldConstraintFn } from "../../../models/interfaces/field-constraint-fn";

export const IS_INSTANCEOF = "is_instanceof";
export const isInstanceof: FieldConstraintFn<{ instanceofType: any }> = ({ fieldValue, args }) =>
    fieldValue instanceof args.instanceofType;
export const isInstanceofMessageBuilder = ({ fieldName, args }) =>
    `The value ${fieldName} is an instance of ${args.instanceofType}.`;

export function IsInstanceof(instanceofType: any, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_INSTANCEOF,
        options,
        { instanceofType },
        IsInstanceof,
        isInstanceofMessageBuilder,
    );
    return decoratorAdapter(adaptee);
}
