import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { NumberFieldOptions } from "../../../../../interfaces"
import { TypeHandlerId } from "./number.type-handler"

export const number = (options?: NumberFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<NumberFieldOptions>(
        options || {},
        TypeHandlerId
    )
}



