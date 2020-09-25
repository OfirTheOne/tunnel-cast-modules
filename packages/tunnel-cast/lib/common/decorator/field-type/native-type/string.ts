import { StringFieldOptions } from "../../../../model"
import { FieldDefinitionDecoratorFactory } from "../factory"
import { StringFieldHandler, FieldTypeId } from "../../../../internal/field-handler/string-field-handler"
import { StringFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const string = (options?: StringFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        StringFieldOptions, 
        StringFieldHandler,
        StringFieldOptionProcessor
    >(
        options||{}, 
        StringFieldHandler,
        new StringFieldOptionProcessor(),
        FieldTypeId
    )
}


