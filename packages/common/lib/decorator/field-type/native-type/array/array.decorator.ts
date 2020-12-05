import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";

import { ArrayHandler, TypeHandlerId, TypeName } from "./array.type-handler";
import { ArrayFieldOptionProcessor } from "./array.option-processor";
import { ArrayFieldOptions } from "./i-array-options";

export const array = (options?: ArrayFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<ArrayFieldOptions>(options || {}, {
        handlerClass: ArrayHandler,
        optionsProcessor: new ArrayFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName,
    });
};
