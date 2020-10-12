import { FieldHandler } from "./../../../../../core/toolbox/field-handler";
import { NativeValidationDict } from "../../../../../interfaces/inner/native-validation-dict";
import { Class } from "../../../../../utils/model";

import { TypeRegistry } from '../../../../../core/toolbox/type-registry'
import { ArrayFieldOptions } from "../../../../../interfaces";
import { ArrayFieldOptionProcessor } from "./array.option-processor";


export const TypeName = 'array'

export const TypeHandlerId = Symbol("ARRAY") 


export class ArrayHandler extends FieldHandler<ArrayFieldOptions> {
    public typeName: string = TypeName

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
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: ArrayHandler,
        optionsProcessor:  new ArrayFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });

