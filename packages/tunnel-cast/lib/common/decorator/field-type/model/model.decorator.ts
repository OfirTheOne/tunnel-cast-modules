
import { ModelFieldOptions } from "../../../../interfaces"
import { TypeHandlerId } from './model.type-handler'
import { FieldModelTypeDecoratorFactory } from './../../../../core/toolbox/decorator-factory/field-model-type.decorator-factory'

export const model = (options?: ModelFieldOptions) => {
    return FieldModelTypeDecoratorFactory(
        TypeHandlerId, 
        options||{}
    )
}


