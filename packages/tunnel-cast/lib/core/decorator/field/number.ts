import { NumberFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { NumberFieldHandler, FieldTypeId } from "../../field-handler/number-field-handler"
import { NumberFieldOptionProcessor } from "../../field-option-processor";


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


