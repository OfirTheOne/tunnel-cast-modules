import { NumberFieldOptions } from "../../../../interfaces"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { FieldTypeId } from "../../../../internal/field-handler/number-field-handler"
import { NumberFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const number = (options?: NumberFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        NumberFieldOptions, 
        NumberFieldOptionProcessor
    >(
        options||{}, 
        new NumberFieldOptionProcessor(),
        FieldTypeId
    )
}


