import { BooleanFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { BooleanFieldHandler } from "../../field-handler"


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldDefinitionDecoratorFactory<BooleanFieldOptions, BooleanFieldHandler>(options||{}, BooleanFieldHandler)
}


