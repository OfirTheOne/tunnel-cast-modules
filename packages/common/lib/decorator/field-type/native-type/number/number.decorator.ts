import { FieldNativeTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-native-type.decorator-factory";

import { NumberFieldOptions } from "./i-number-options";
import { NumberFieldOptionProcessor } from "./number.option-processor";
import { NumberHandler, TypeHandlerId, TypeName } from "./number.type-handler";


export const number = (options?: NumberFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<NumberFieldOptions>(
        options || {}, 
        {
            handlerClass: NumberHandler,
            optionsProcessor: new NumberFieldOptionProcessor(),
            typeHandlerId: TypeHandlerId,
            typeName: TypeName,
        }
    );
};
