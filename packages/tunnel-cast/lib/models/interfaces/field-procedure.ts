import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";

export abstract class FieldProcedure {

    public abstract fieldProcedureType: FieldProcedureType;

    public abstract procedureId: string;

    public abstract fieldName: string;
    public abstract contextRef: any;
  
}