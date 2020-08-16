import { ArrayFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { ArrayFieldHandler } from "../../field-handler"


export const array = (options?: ArrayFieldOptions) => {
    return FieldDefinitionDecoratorFactory<ArrayFieldOptions, ArrayFieldHandler>(options||{}, ArrayFieldHandler)
}


