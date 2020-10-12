import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { StringFieldOptions } from "../../../../../interfaces"
import { TypeHandlerId } from "./string.type-handler";

export const string = (options?: StringFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<StringFieldOptions>(
        options||{}, 
        TypeHandlerId
    )
}


