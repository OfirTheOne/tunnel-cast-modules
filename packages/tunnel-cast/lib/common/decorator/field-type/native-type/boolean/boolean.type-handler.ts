import { BooleanFieldOptions } from "../../../../../interfaces";
import { FieldHandler } from "./../../../../../core/toolbox/field-handler";
import { NativeValidationDict } from "../../../../../interfaces/inner/native-validation-dict";
import { Class } from "../../../../../utils/model";

import { TypeRegistry } from '../../../../../core/toolbox/type-registry'
import { BooleanFieldOptionProcessor } from "./boolean.option-processor";

export const FieldTypeId = Symbol("BOOLEAN") 

export const TypeName = 'boolean'

export class BooleanHandler extends FieldHandler<BooleanFieldOptions> {
    
    public typeName: string = TypeName;

    nativeValidations : NativeValidationDict<BooleanFieldOptions> = {
    };


    constructor(context: any, fieldName: string, projectedContext: any, parentModelRef: Class) { 
        super(context, fieldName, projectedContext, parentModelRef)
    }

    typeCondition(value: any, options: BooleanFieldOptions): boolean {
        return typeof value == 'boolean';
    }

    processOption(options: BooleanFieldOptions): BooleanFieldOptions {
        const baseOptions = super.processOption(options);
        return { ...options, ...baseOptions }
    }
}



TypeRegistry
    .getInstance()
    .register(FieldTypeId, {
        handlerClass: BooleanHandler,
        optionsProcessor:  new BooleanFieldOptionProcessor(),
        typeHandlerId: FieldTypeId,
        typeName: TypeName
    });




