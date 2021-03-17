import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldConditionalHandlingProcedureOptions } from "../../models/interfaces/field-conditional-handling-procedure-options";

export class FieldConditionalHandlingProcedure<A = any> implements FieldProcedure {
    public readonly fieldProcedureType: FieldProcedureType = FieldProcedureType.ConditionalHandling;
    public fieldName: string;
    public contextRef: any;

    constructor(
        public readonly procedureId: string,
        public options: FieldConditionalHandlingProcedureOptions,
        public args: A,
        public readonly condition: ((conditionFnParams: { args: A, fieldValue: any, fieldName: string, path: string, context: any}) => boolean),
    ) {

    }
}