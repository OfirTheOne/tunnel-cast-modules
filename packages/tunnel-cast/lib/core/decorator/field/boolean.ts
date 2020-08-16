import { BooleanFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { BooleanFieldHandler } from "../../field-handler"
import { BooleanFieldOptionProcessor } from "../../field-option-processor";


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldDefinitionDecoratorFactory<
        BooleanFieldOptions, 
        BooleanFieldHandler,
        BooleanFieldOptionProcessor
    >(
        options||{}, 
        BooleanFieldHandler, 
        new BooleanFieldOptionProcessor()
    )
}


