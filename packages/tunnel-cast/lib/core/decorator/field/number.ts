import { NumberFieldOptions } from "../../../model"
import { FieldDefinitionDecoratorFactory } from "./factory"
import { NumberFieldHandler } from "../../field-handler"


export const number = (options?: NumberFieldOptions) => {
    return FieldDefinitionDecoratorFactory<NumberFieldOptions, NumberFieldHandler>(options||{}, NumberFieldHandler)
}


