import { BooleanFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../model/inner/native-validation-dict";
import { Class } from "../../utils/model";


export const FieldTypeId = "BOOLEAN" 

export class BooleanFieldHandler extends FieldHandler<BooleanFieldOptions> {

    nativeValidations : NativeValidationDict<BooleanFieldOptions> = {
    };


    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) { 
        super(context, fieldName, projectedContext, parentModelRef)
    }

    typeCondition(value: any, options: BooleanFieldOptions): boolean {
        return typeof value == 'boolean';
    }

    processOption(options: BooleanFieldOptions): BooleanFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





