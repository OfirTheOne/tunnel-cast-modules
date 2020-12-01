import { ModelFieldOptions } from "./i-model-options";
import { FieldModelTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-model-type.decorator-factory";

import { TypeRegistry } from "@tunnel-cast/core/type-registry";
import { ModelHandler, TypeHandlerId } from "./model.type-handler";
import { ModelFieldOptionProcessor } from "./model.option-processor";

TypeRegistry.getInstance().register(TypeHandlerId, {
    handlerClass: ModelHandler,
    optionsProcessor: new ModelFieldOptionProcessor(),
    typeHandlerId: TypeHandlerId,
    typeName: undefined,
});

export const model = (options?: ModelFieldOptions) => {
    return FieldModelTypeDecoratorFactory(TypeHandlerId, options || {});
};
