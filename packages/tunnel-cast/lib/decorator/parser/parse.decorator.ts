import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldParserProcedure } from "../../core/field-decorator-procedure/field-parser.procedure";
import { FieldParserFn } from "../../models/interfaces/field-parser-fn";
import { FieldParserProcedureOptions } from "../../models/interfaces/field-parser-procedure-options";

export const PARSE = "parse";

/**
 * 
 * @decorator_type **FieldParserProcedure**
 * 
 * @param parserFn 
 * @param options 
 */
export function Parse(
    parserFn: FieldParserFn,
    options?: FieldParserProcedureOptions,
) {
    const adaptee = new FieldParserProcedure(
        PARSE,
        options,
        { },
        parserFn,
    );
    return decoratorAdapter(adaptee);
}
