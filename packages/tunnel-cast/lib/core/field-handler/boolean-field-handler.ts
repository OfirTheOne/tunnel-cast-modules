import { BooleanFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../model/inner/native-validation-dict";


export const FieldTypeId = "BOOLEAN" 

export class BooleanFieldHandler extends FieldHandler<BooleanFieldOptions> {

    nativeValidations : NativeValidationDict<BooleanFieldOptions> = {
    };


    constructor(context: any, fieldName: string, projectedContext: any) { 
        super(context, fieldName, projectedContext)
    }

    typeCondition(value: any, options: BooleanFieldOptions): boolean {
        return typeof value == 'boolean';
    }

    processOption(options: BooleanFieldOptions): BooleanFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





