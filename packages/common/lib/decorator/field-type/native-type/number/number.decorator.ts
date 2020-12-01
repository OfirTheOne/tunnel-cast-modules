import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";
import { TypeRegistry } from "@tunnel-cast/core/type-registry";

import { NumberFieldOptions } from "./i-number-options";
import { NumberFieldOptionProcessor } from "./number.option-processor";
import { NumberHandler, TypeHandlerId, TypeName } from "./number.type-handler";

TypeRegistry.getInstance().register(TypeHandlerId, {
    handlerClass: NumberHandler,
    optionsProcessor: new NumberFieldOptionProcessor(),
    typeHandlerId: TypeHandlerId,
    typeName: TypeName,
});

console.log(`${String(TypeHandlerId)} registered`);

export const number = (options?: NumberFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<NumberFieldOptions>(options || {}, TypeHandlerId);
};
