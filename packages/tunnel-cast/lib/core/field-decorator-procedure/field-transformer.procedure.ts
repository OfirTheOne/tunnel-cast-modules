import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { FieldConstraintFn } from "lib/models/interfaces/field-constraint-fn";

export class FieldTransformerProcedure<A extends Array<any> = Array<any>> implements FieldProcedure {
    public readonly fieldProcedureType: FieldProcedureType = FieldProcedureType.Transformer;
    public fieldName: string;
    public contextRef: any;

    constructor(
        public readonly procedureId: string,
        public options: FieldConstraintProcedureOptions,
        public args: A,
        public readonly transform: FieldConstraintFn<A>,
        public readonly messageBuilder: string | ((messageBuilderFnParams:  { args: Array<any>, fieldValue: any, fieldName: string, path: string}) => string)
    ) {

    }
}