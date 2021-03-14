import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldDefaultAssignmentProcedure } from "../../core/field-decorator-procedure/field-default-assignment.procedure";


const DEFAULT = "default";

export const defaultAssigner =  (fnArgs) => typeof fnArgs.args[0] == 'function' ? fnArgs.args[0](fnArgs) : fnArgs.args[0]

export function Default(valueOrFactory: Function | unknown, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldDefaultAssignmentProcedure(
        DEFAULT,
        options,
        [valueOrFactory],
        defaultAssigner
    );
    return decoratorAdapter(adaptee);
}
