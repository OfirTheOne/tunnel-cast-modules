import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConditionalHandlingProcedure } from "../../core/field-decorator-procedure/field-conditional-handling.procedure";

export const NULLABLE = "nullable";
export const nullable = ({ fieldValue, fieldName ,args, context }) => !(fieldValue == null || fieldValue == undefined);


/**
 * 
 * @note get priority over Required decorator.
 * 
 * @param options 
 */
export function Nullable(options? : any) {
    const adaptee = new FieldConditionalHandlingProcedure(
        NULLABLE,
        options,
        {},
        nullable
    );
    return decoratorAdapter(adaptee);
}
