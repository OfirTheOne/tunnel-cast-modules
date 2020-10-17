
import { ModelFieldOptions } from "../../../../interfaces"
import { FieldModelTypeDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-model-type.decorator-factory'

import { TypeRegistry } from "../../../../core/toolbox/type-registry";
import { ModelHandler, TypeHandlerId } from './model.type-handler'
import { ModelFieldOptionProcessor } from "./model.option-processor";

TypeRegistry
    .getInstance()
    .register(TypeHandlerId, {
        handlerClass: ModelHandler,
        optionsProcessor:  new ModelFieldOptionProcessor(),
        typeHandlerId: TypeHandlerId,
        typeName: undefined
    });

    
export const model = (options?: ModelFieldOptions) => {
    return FieldModelTypeDecoratorFactory(
        TypeHandlerId, 
        options||{}
    )
}


