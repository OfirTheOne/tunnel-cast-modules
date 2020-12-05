import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";

import { StringFieldOptions } from "./i-string-options";
import { StringHandler, TypeHandlerId, TypeName } from "./string.type-handler";
import { StringFieldOptionProcessor } from "./string.option-processor";

export const string = (options?: StringFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<StringFieldOptions>(options || {}, {
        handlerClass: StringHandler,
        optionsProcessor: new StringFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName,
    });
};
