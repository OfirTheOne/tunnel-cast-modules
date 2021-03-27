import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldProcedureOptions } from "./field-procedure-options";

export abstract class FieldProcedure {

    public abstract fieldProcedureType: FieldProcedureType;

    public abstract procedureId: string;

    public abstract fieldName: string;
    
    public abstract options: FieldProcedureOptions;
    // public abstract contextRef: any;
  
}