
import { FieldHandler } from '../../../../../core/toolbox/field-handler';
import { NativeValidationDict } from '../../../../../interfaces/inner/native-validation-dict';
import { NumberFieldOptions } from '../../../../../interfaces/public/field-options';
import { Class } from '../../../../../utils/model';

export const TypeHandlerId = Symbol("NUMBER") 

export const TypeName = 'number';


export class NumberHandler extends FieldHandler<NumberFieldOptions> {
    public typeName: string = TypeName;

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



