

import { FieldConstraintProcedureOptions } from "./field-constraint-procedure-options";


export interface FieldConstraintFn<Args> {
    (constraintFnParams: { 
        args: Args, 
        fieldValue: any, 
        fieldName: string, 
        path: string, 
        context: any
        options: FieldConstraintProcedureOptions
    }) : boolean
}