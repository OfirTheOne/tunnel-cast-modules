import { Class } from "../../utils/model";
import { StringFieldOptions } from "../../interfaces";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../interfaces/inner/native-validation-dict";

import { TypeRegistry } from '../type-registry'

export const FieldTypeId = Symbol("STRING") 

export class StringHandler extends FieldHandler<StringFieldOptions> {

    nativeValidations : NativeValidationDict<StringFieldOptions> = {
        'format' : { 
            condition: (value, format) =>  new RegExp(format).test(value),
            message: 'format failed',
        },
        'enums' : { 
            condition: (value, enums) => (enums.length == 0 || enums.includes(value)),
            message: 'enums failed',
        }
    };


    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) { 
        super(context, fieldName, projectedContext, parentModelRef)
    }

    typeCondition(value: any, options: StringFieldOptions): boolean {
        return typeof value == 'string';
    }

    processOption(options: StringFieldOptions): StringFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}


TypeRegistry
    .getInstance()
    .register(FieldTypeId, StringHandler);




