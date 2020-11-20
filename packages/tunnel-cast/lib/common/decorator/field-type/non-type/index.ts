import { FieldHandler } from "../../../../core/toolbox/field-handler";
import { BaseFieldOptions } from "../../../../interfaces";
import { NativeValidationDict } from "../../../../interfaces/inner/native-validation-dict";

export const TypeHandlerId = Symbol("NON_TYPE") 

export const TypeName = 'non-type'

export class NonTypeFieldHandler extends FieldHandler {
    public nativeValidations: NativeValidationDict<BaseFieldOptions>;
    public typeName: string = TypeName;
    public typeCondition(value: any, options: BaseFieldOptions): boolean {
        throw new Error("Method not implemented.");
    }
   
} 
