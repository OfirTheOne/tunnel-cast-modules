import { ArrayFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict, NativeValidationEntry } from '../../model/inner/native-validation-dict'



export const FieldTypeId = "ARRAY" 


export class ArrayFieldHandler extends FieldHandler<ArrayFieldOptions> {


    nativeValidations : NativeValidationDict<ArrayFieldOptions> = {
        'maxLength' : { 
            condition: (value, maxLength) => value.length < maxLength,
            message: 'maxLength failed',
        },
        'minLength' : { 
            condition: (value, minLength) => value.length >= minLength,
            message: 'minLength failed',
        },
        'ofType' : { 
            condition: (value, ofType) => value.every( item => typeof item == ofType),
            message: 'ofType failed',
        },
        'allowType' :  { 
            condition: (value, allowType) => (allowType.length == 0 || value.every( item => allowType.includes(typeof item as any) )), 
            message: 'allowType failed',
        }
    };

    
    constructor(context: any, fieldName: string, projectedContext: any) { 
        super(context, fieldName, projectedContext)
    }


    typeCondition(value: any, options: ArrayFieldOptions): boolean {
        return Array.isArray(value);
    }

    processOption(options: ArrayFieldOptions): ArrayFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





