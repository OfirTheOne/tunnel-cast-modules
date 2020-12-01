import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";
import { TypeRegistry } from "@tunnel-cast/core/type-registry";

import { StringFieldOptions } from "./i-string-options";
import { StringHandler, TypeHandlerId, TypeName } from "./string.type-handler";
import { StringFieldOptionProcessor } from "./string.option-processor";

TypeRegistry.getInstance().register(TypeHandlerId, {
    handlerClass: StringHandler,
    optionsProcessor: new StringFieldOptionProcessor(),
    typeHandlerId: TypeHandlerId,
    typeName: TypeName,
});

console.log(`${String(TypeHandlerId)} registered`);

export const string = (options?: StringFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<StringFieldOptions>(options || {}, TypeHandlerId);
};
