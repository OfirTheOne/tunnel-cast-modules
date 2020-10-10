import { StringFieldOptions } from "../../../../interfaces"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { FieldTypeId } from "../../../../internal/field-handler/string-field-handler"
import { StringFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const string = (options?: StringFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        StringFieldOptions, 
        StringFieldOptionProcessor
    >(
        options||{}, 
        new StringFieldOptionProcessor(),
        FieldTypeId
    )
}


