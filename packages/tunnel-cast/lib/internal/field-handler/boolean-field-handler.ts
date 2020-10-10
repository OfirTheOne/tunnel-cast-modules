import { BooleanFieldOptions } from "../../interfaces";
import { FieldHandler } from "./field-handler";
import { NativeValidationDict } from "../../interfaces/inner/native-validation-dict";
import { Class } from "../../utils/model";

import { TypeRegistry } from '../type-registry'

export const FieldTypeId = Symbol("BOOLEAN") 

export class BooleanHandler extends FieldHandler<BooleanFieldOptions> {

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
    .register(FieldTypeId, BooleanHandler);






