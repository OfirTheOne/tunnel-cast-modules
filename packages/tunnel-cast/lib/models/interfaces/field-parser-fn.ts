

import { FieldParserProcedureOptions } from "./field-parser-procedure-options";


export interface FieldParserFn<Args=any, Ret=any> {
    (constraintFnParams: { 
        args: Args, 
        fieldValue: any, 
        fieldName: string, 
        path: string, 
        context: any, 
        options: FieldParserProcedureOptions
    }) : Ret;
}