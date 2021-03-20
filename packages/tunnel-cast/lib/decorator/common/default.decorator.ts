import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldDefaultAssignmentProcedure } from "../../core/field-decorator-procedure/field-default-assignment.procedure";
import { EmptyIdentifierFn } from "../../models/interfaces/empty-identifier-fn";
import { DefaultWithFn } from "../../models/interfaces/default-with-fn";


export const DEFAULT = "default";
export const defaultAssigner: DefaultWithFn = (fnArgs) => typeof fnArgs.args.valueOrFactory == 'function' ? fnArgs.args.valueOrFactory(fnArgs) : fnArgs.args.valueOrFactory

export function Default(valueOrFactory: Function | unknown, emptyIdentifier?: EmptyIdentifierFn|Array<any> , options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldDefaultAssignmentProcedure(
        DEFAULT,
        options,
        {valueOrFactory},
        defaultAssigner,
        emptyIdentifier
    );
    return decoratorAdapter(adaptee);
}
