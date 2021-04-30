import { FieldProcedureOptions } from "./field-procedure-options";

export interface FieldConstraintProcedureOptions extends FieldProcedureOptions {
    if?: (value: any, context: any) => boolean;
    message?: string;
    iterate?: boolean;
    skipIfEmpty?: boolean;
}
