import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConditionalHandlingProcedure } from "../../core/field-decorator-procedure/field-conditional-handling.procedure";

export const SKIP_IF = "skip_if";
export const skipIf = ({ fieldValue, fieldName ,args, context }) => !args.cond(fieldValue, fieldName, context)

export function SkipIf(cond: ((value, name, context) => boolean)) {
    const adaptee = new FieldConditionalHandlingProcedure(
        SKIP_IF,
        {},
        {cond},
        skipIf
    );
    return decoratorAdapter(adaptee);
}
