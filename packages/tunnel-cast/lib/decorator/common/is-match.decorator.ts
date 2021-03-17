import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";

const IS_MATCH = "is_match";



export function IsMatch(pattern: RegExp, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_MATCH,
        options,
        {pattern},
        ({ fieldValue, args }) => typeof fieldValue == 'string' && args.pattern.test(fieldValue),
        ({ fieldName }) => `The field ${fieldName} is match the pattern provided`
    );
    return decoratorAdapter(adaptee);
}
