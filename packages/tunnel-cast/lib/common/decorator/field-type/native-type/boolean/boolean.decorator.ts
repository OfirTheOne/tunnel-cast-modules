import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { BooleanFieldOptions } from "../../../../../interfaces"

import { TypeRegistry } from "../../../../../core/toolbox/type-registry";
import { BooleanFieldOptionProcessor } from "./boolean.option-processor";
import { BooleanHandler, TypeHandlerId, TypeName } from "./boolean.type-handler"


TypeRegistry
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: BooleanHandler,
        optionsProcessor:  new BooleanFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });

console.log(`${String(TypeHandlerId)} registered`);


export const boolean = (options?: BooleanFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<
        BooleanFieldOptions>(
        options||{}, 
        TypeHandlerId
    )
}


