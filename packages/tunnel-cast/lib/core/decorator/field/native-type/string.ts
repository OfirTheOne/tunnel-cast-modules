import { StringFieldOptions } from "../../../../model"
import { FieldDefinitionDecoratorFactory } from "./../factory"
import { StringFieldHandler, FieldTypeId } from "../../../field-handler/string-field-handler"
import { StringFieldOptionProcessor } from "../../../field-option-processor";


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


