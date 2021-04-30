import { FieldProcedureOptions } from "./field-procedure-options";

export interface FieldParserProcedureOptions extends FieldProcedureOptions {
    if?: (value: any, context: any) => boolean;
    skipIfEmpty?: boolean;
}
