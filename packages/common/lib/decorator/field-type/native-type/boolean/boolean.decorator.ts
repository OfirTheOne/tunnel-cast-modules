import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";

import { BooleanFieldOptions } from "./i-boolean-options";
import { BooleanFieldOptionProcessor } from "./boolean.option-processor";
import { BooleanHandler, TypeHandlerId, TypeName } from "./boolean.type-handler";

export const boolean = (options?: BooleanFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<BooleanFieldOptions>(
        options || {}, 
        {
            handlerClass: BooleanHandler,
            optionsProcessor: new BooleanFieldOptionProcessor(),
            typeHandlerId: TypeHandlerId,
            typeName: TypeName
        }
    );
};
