import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldParserProcedureOptions } from "../../models/interfaces/field-parser-procedure-options";
import { FieldParserFn } from "../../models/interfaces/field-parser-fn";

export class FieldParserProcedure<A = any> implements FieldProcedure {
    public readonly fieldProcedureType: FieldProcedureType = FieldProcedureType.Parser;
    public fieldName: string;
    // public contextRef: any;

    constructor(
        public readonly procedureId: string,
        public options: FieldParserProcedureOptions,
        public args: A,
        public readonly parse: FieldParserFn<A>,
    ) {}
}
