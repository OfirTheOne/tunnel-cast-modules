import { StringFieldOptions } from "../../model";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../model/native-validation-dict";

export class StringFieldHandler extends FieldHandler<StringFieldOptions> {

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


    constructor(context: any, fieldName: string, projectedContext: any) { 
        super(context, fieldName, projectedContext)
    }

    typeCondition(value: any, options: StringFieldOptions): boolean {
        return typeof value == 'string';
    }

    processOption(options: StringFieldOptions): StringFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





