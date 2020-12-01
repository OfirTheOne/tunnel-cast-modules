import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";
import { ArrayFieldOptions } from "./i-array-options";

import { TypeRegistry } from "@tunnel-cast/core/type-registry";
import { ArrayHandler, TypeHandlerId, TypeName } from "./array.type-handler";
import { ArrayFieldOptionProcessor } from "./array.option-processor";

TypeRegistry.getInstance().register(TypeHandlerId, {
    handlerClass: ArrayHandler,
    optionsProcessor: new ArrayFieldOptionProcessor(),
    typeHandlerId: TypeHandlerId,
    typeName: TypeName,
});

console.log(`${String(TypeHandlerId)} registered`);

export const array = (options?: ArrayFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<ArrayFieldOptions>(options || {}, TypeHandlerId);
};
