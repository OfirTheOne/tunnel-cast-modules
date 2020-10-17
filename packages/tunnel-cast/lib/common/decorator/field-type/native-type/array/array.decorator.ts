import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { ArrayFieldOptions } from "../../../../../interfaces"

import { TypeRegistry } from "../../../../../core/toolbox/type-registry";
import { ArrayHandler, TypeHandlerId, TypeName } from "./array.type-handler"
import { ArrayFieldOptionProcessor } from "./array.option-processor";

TypeRegistry
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: ArrayHandler,
        optionsProcessor:  new ArrayFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });

console.log(`${String(TypeHandlerId)} registered`);


export const array = (options?: ArrayFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<ArrayFieldOptions>(
        (options||{}), 
        TypeHandlerId
    )
}



