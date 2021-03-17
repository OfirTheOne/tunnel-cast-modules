import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import {FieldConstraintFn  } from "../../models/interfaces/field-constraint-fn";
const IS_TYPEOF = "is_typeof";



export const isTypeof: FieldConstraintFn<{typeofString: string}> = ({ fieldValue, args }) => typeof fieldValue == args.typeofString;

export function IsTypeof(typeofString: string, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_TYPEOF,
        options,
        {typeofString},
        isTypeof,
        ({ fieldName, args }) => `The value ${args[0]} is not equals to 'typeof' the field ${fieldName} is `
    );
    return decoratorAdapter(adaptee);
}
