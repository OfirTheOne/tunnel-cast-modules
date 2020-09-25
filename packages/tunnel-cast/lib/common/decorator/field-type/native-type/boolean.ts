import { BooleanFieldOptions } from "../../../../model"
import { FieldDefinitionDecoratorFactory } from "../factory"
import { BooleanFieldHandler, FieldTypeId } from "../../../../internal/field-handler/boolean-field-handler"
import { BooleanFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        BooleanFieldOptions, 
        BooleanFieldHandler,
        BooleanFieldOptionProcessor
    >(
        options||{}, 
        BooleanFieldHandler, 
        new BooleanFieldOptionProcessor(),
        FieldTypeId
    )
}


