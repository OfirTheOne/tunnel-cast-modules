import { BaseFieldOptions } from "../../model";
import { FieldHandler } from "../field-handler";
import { NativeValidationDict } from "../../model/native-validation-dict";
import { Class } from "../../utils/model";
import { cast } from '../cast'



export const FieldTypeId = "MODEL" 

export class ModelFieldHandler extends FieldHandler<BaseFieldOptions> {

    nativeValidations : NativeValidationDict<BaseFieldOptions> = {
    };


    constructor(context: any, fieldName: string, projectedContext: any, protected modelClass: Class) { 
        super(context, fieldName, projectedContext)
    }

    protected extractValue(options: BaseFieldOptions) {
        const value = super.extractValue(options)
        const castValue = cast(this.modelClass, value);
        if('errors' in castValue) {
            throw castValue
        } else {
            return castValue.value;
        }
    }

    typeCondition(value: any, options: BaseFieldOptions): boolean {
        return true;
    }

    processOption(options: BaseFieldOptions): BaseFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}





