import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { ArrayFieldOptions } from "../../../../../interfaces"
import { TypeHandlerId } from "./array.type-handler"


export const array = (options?: ArrayFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<ArrayFieldOptions>(
        (options||{}), 
        TypeHandlerId
    )
}



