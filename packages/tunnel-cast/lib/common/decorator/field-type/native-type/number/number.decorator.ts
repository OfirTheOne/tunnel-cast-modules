import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { NumberFieldOptions } from "../../../../../interfaces"

import { TypeRegistry } from "../../../../../core/toolbox/type-registry";
import { NumberFieldOptionProcessor } from "./number.option-processor";
import { NumberHandler, TypeHandlerId, TypeName } from "./number.type-handler"


TypeRegistry
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: NumberHandler,
        optionsProcessor:  new NumberFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });

console.log(`${String(TypeHandlerId)} registered`);

export const number = (options?: NumberFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<NumberFieldOptions>(
        options || {},
        TypeHandlerId
    )
}



