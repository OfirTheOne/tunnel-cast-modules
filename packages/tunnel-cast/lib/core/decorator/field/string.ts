import { StringFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { StringFieldHandler } from "../../field-handler"


export const string = (options?: StringFieldOptions) => {
    return FieldDefinitionDecoratorFactory<StringFieldOptions, StringFieldHandler>(options||{}, StringFieldHandler)
}


