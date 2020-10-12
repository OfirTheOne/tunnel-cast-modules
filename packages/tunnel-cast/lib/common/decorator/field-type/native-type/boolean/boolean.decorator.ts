import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { BooleanFieldOptions } from "../../../../../interfaces"
import { FieldTypeId } from "./boolean.type-handler"
import { BooleanFieldOptionProcessor } from "./boolean.option-processor";


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<
        BooleanFieldOptions>(
        options||{}, 
        FieldTypeId
    )
}


