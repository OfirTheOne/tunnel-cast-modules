import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { DefaultWithFn } from "../../models/interfaces/default-with-fn";
import { EmptyIdentifierFn } from "../../models/interfaces/empty-identifier-fn";

export class FieldDefaultAssignmentProcedure<A extends Array<any> = Array<any>> implements FieldProcedure {
    public readonly fieldProcedureType: FieldProcedureType = FieldProcedureType.DefaultAssignment;
    public fieldName: string;
    public contextRef: any;

    constructor(
        public readonly procedureId: string,
        public options: FieldConstraintProcedureOptions,
        public args: A,
        public readonly defaultWith: DefaultWithFn<A> | unknown,
        public readonly emptyIdentifier?: EmptyIdentifierFn<A> | Array<any>,

    ) {

    }
}