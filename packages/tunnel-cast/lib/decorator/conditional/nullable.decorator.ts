import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConditionalHandlingProcedure } from "../../core/field-decorator-procedure/field-conditional-handling.procedure";
import { FieldConditionalHandlingProcedureOptions } from "../../models/interfaces/field-conditional-handling-procedure-options";

export const NULLABLE = "nullable";
export const nullable = ({ fieldValue, fieldName, args, context }) => !(fieldValue == null || fieldValue == undefined);

/**
 * @decorator_type **FieldConditionalHandlingProcedure**
 *
 * @note get priority over Required decorator.
 *
 * @param options
 */
export function Nullable(options?: FieldConditionalHandlingProcedureOptions) {
    const adaptee = new FieldConditionalHandlingProcedure(NULLABLE, options, {}, nullable);
    return decoratorAdapter(adaptee);
}
