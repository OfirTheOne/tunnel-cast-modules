import { NumberFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../model/inner/native-validation-dict";
import { Class } from "../../utils/model";

import { TypeRegistry } from '../type-registry'

export const FieldTypeId = Symbol("NUMBER") 

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


    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) { 
        super(context, fieldName, projectedContext, parentModelRef)
    }

    typeCondition(value: any, options: NumberFieldOptions): boolean {
        return typeof value == 'number';
    }

    processOption(options: NumberFieldOptions): NumberFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}


TypeRegistry
    .fetch()
    .register(FieldTypeId, NumberFieldHandler);





