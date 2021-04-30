/**
 * @decorator_type **FieldTransformerProcedure**
 * @decorator_type **FieldParserProcedure**
 *
 */

import { FieldParserFn } from "../../models/interfaces/field-parser-fn";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldParserProcedure } from "../../core/field-decorator-procedure/field-parser.procedure";
import { FieldParserProcedureOptions } from "../../models/interfaces/field-parser-procedure-options";

export const MAP = "map";
export const map: FieldParserFn = ({ fieldValue, args, context }) => {
    return Array.isArray(fieldValue) && typeof args.mapper == "function"
        ? fieldValue.map((v, i) => args.mapper(v, i, context))
        : fieldValue;
};

/**
 * @decorator_type **FieldParserProcedure**
 *
 * @param mapper
 * @param options
 */
export function Map(mapper: (v: any, i: number, context: any) => any, options?: FieldParserProcedureOptions) {
    const adaptee = new FieldParserProcedure(MAP, options || {}, { mapper }, map);
    return decoratorAdapter(adaptee);
}
