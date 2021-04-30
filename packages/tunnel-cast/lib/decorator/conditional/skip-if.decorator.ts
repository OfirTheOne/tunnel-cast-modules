import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConditionalHandlingProcedure } from "../../core/field-decorator-procedure/field-conditional-handling.procedure";
import { FieldConditionalHandlingProcedureOptions } from "../../models/interfaces/field-conditional-handling-procedure-options";

export const SKIP_IF = "skip_if";
export const skipIf = ({ fieldValue, fieldName, args, context }) => !args.cond(fieldValue, fieldName, context);

/**
 * @decorator_type **FieldConditionalHandlingProcedure**
 *
 * @param cond
 * @param options
 */
export function SkipIf(cond: (value, name, context) => boolean, options?: FieldConditionalHandlingProcedureOptions) {
    const adaptee = new FieldConditionalHandlingProcedure(SKIP_IF, options, { cond }, skipIf);
    return decoratorAdapter(adaptee);
}
