import { ArrayFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from '../../model/inner/native-validation-dict'
import { Class } from "../../utils/model";

import { TypeRegistry } from '../type-registry'

export const FieldTypeId = Symbol("ARRAY") 

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

    
    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) { 
        super(context, fieldName, projectedContext, parentModelRef)
    }


    typeCondition(value: any, options: ArrayFieldOptions): boolean {
        return Array.isArray(value);
    }

    processOption(options: ArrayFieldOptions): ArrayFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}

TypeRegistry
    .fetch()
    .register(FieldTypeId, ArrayFieldHandler);


