import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConditionalHandlingProcedure } from "../../core/field-decorator-procedure/field-conditional-handling.procedure";

const SKIP_IF = "skip_if";



export function SkipIf(cond: ((value, name, context) => boolean)) {
    const adaptee = new FieldConditionalHandlingProcedure(
        SKIP_IF,
        {},
        [cond],
        ({ fieldValue, fieldName ,args, context }) => args[0](fieldValue, fieldName, context)
    );
    return decoratorAdapter(adaptee);
}
