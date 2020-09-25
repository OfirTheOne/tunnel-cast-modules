import { NumberFieldOptions } from "../../../../model"
import { FieldDefinitionDecoratorFactory } from "../factory"
import { NumberFieldHandler, FieldTypeId } from "../../../../internal/field-handler/number-field-handler"
import { NumberFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const number = (options?: NumberFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        NumberFieldOptions, 
        NumberFieldHandler,
        NumberFieldOptionProcessor
    >(
        options||{}, 
        NumberFieldHandler,
        new NumberFieldOptionProcessor(),
        FieldTypeId
    )
}


