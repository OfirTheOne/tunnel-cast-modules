import { BooleanFieldOptions } from "../../../../interfaces"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { FieldTypeId } from "../../../../internal/field-handler/boolean-field-handler"
import { BooleanFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        BooleanFieldOptions, 
        BooleanFieldOptionProcessor
    >(
        options||{}, 
        new BooleanFieldOptionProcessor(),
        FieldTypeId
    )
}


