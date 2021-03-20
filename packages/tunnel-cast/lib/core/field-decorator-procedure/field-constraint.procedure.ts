import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { FieldConstraintFn } from "../../models/interfaces/field-constraint-fn";
import { MessageBuilderFn } from "../../models/interfaces/message-builder-fn";

export class FieldConstraintProcedure<A = any> implements FieldProcedure {
    public readonly fieldProcedureType: FieldProcedureType = FieldProcedureType.Constraint;
    public fieldName: string;
    public contextRef: any;

    constructor(
        public readonly procedureId: string,
        public options: FieldConstraintProcedureOptions = {},
        public args: A = ({} as any),
        public readonly constraint: FieldConstraintFn<A>,
        public readonly messageBuilder: string | MessageBuilderFn<A>
    ) {

    }
}