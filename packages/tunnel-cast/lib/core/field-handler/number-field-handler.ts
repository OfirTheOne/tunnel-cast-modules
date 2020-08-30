import { NumberFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "lib/model/native-validation-dict";



export const FieldTypeId = "NUMBER" 

export class NumberFieldHandler extends FieldHandler<NumberFieldOptions> {

    nativeValidations : NativeValidationDict<NumberFieldOptions> = {
        'max' : { 
            condition: (value, max) => value < max,
            message: 'max failed',
        },
        'min' : { 
            condition: (value, min) => value >= min,
            message: 'min failed',
        }
    };


    constructor(context: any, fieldName: string, projectedContext: any) { 
        super(context, fieldName, projectedContext)
    }

    typeCondition(value: any, options: NumberFieldOptions): boolean {
        return typeof value == 'number';
    }

    processOption(options: NumberFieldOptions): NumberFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





