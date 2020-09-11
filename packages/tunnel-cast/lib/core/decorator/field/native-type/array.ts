import { ArrayFieldOptions } from "../../../../model"
import { FieldDefinitionDecoratorFactory } from "./../factory"
import { ArrayFieldHandler, FieldTypeId } from "../../../field-handler/array-field-handler"
import { ArrayFieldOptionProcessor } from "../../../field-option-processor";


export const array = (options?: ArrayFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        ArrayFieldOptions, 
        ArrayFieldHandler,
        ArrayFieldOptionProcessor
    >(
        (options||{}), 
        ArrayFieldHandler,
        new ArrayFieldOptionProcessor(),
        FieldTypeId
    )
}


