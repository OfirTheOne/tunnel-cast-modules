import { ArrayFieldOptions } from "../../../../interfaces"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { TypeHandlerId } from "../../../../internal/field-handler/array-handler/type-handler-id.symbol"
import { ArrayFieldOptionProcessor } from "../../../../internal/field-option-processor";


export const array = (options?: ArrayFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        ArrayFieldOptions, 
        ArrayFieldOptionProcessor
    >(
        (options||{}), 
        new ArrayFieldOptionProcessor(),
        TypeHandlerId
    )
}


