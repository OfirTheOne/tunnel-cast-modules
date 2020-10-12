import { FieldHandler } from "./../../../../../core/toolbox/field-handler";
import { NativeValidationDict } from "../../../../../interfaces/inner/native-validation-dict";
import { Class } from "../../../../../utils/model";

import { TypeRegistry } from '../../../../../core/toolbox/type-registry'
import { StringFieldOptions } from "../../../../../interfaces";
import { StringFieldOptionProcessor } from "./string.option-processor";


export const TypeHandlerId = Symbol("STRING") 

export const TypeName = 'string'

export class StringHandler extends FieldHandler<StringFieldOptions> {
    public typeName: string = TypeName;

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
    .register(TypeHandlerId, {
        handlerClass: StringHandler,
        optionsProcessor:  new StringFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });
