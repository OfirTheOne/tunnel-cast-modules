import { FieldConstraintProcedureOptions } from "./field-constraint-procedure-options";

export interface MessageBuilderFn<A = any> {
    (messageBuilderFnParams: {
        args: A;
        fieldValue: any;
        fieldName: string;
        path: string;
        options: FieldConstraintProcedureOptions;
    }): string;
}
