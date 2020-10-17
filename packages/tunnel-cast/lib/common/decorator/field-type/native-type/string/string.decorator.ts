import { FieldNativeTypeDecoratorFactory } from "../../../../../core/toolbox/decorator-factory/field-native-type.decorator-factory"
import { StringFieldOptions } from "../../../../../interfaces"

import { TypeRegistry } from '../../../../../core/toolbox/type-registry'
import { StringHandler, TypeHandlerId, TypeName } from "./string.type-handler";
import { StringFieldOptionProcessor } from "./string.option-processor";

TypeRegistry
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: StringHandler,
        optionsProcessor:  new StringFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: TypeName
    });

console.log(`${String(TypeHandlerId)} registered`);
    
export const string = (options?: StringFieldOptions) => {
    return FieldNativeTypeDecoratorFactory<StringFieldOptions>(
        options||{}, 
        TypeHandlerId
    )
}


