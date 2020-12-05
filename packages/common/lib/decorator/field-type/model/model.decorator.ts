import { FieldModelTypeDecoratorFactory } from "@tunnel-cast/core/decorator-factory/field-model-type.decorator-factory";

import { ModelFieldOptions } from "./i-model-options";
import { ModelHandler, TypeHandlerId } from "./model.type-handler";
import { ModelFieldOptionProcessor } from "./model.option-processor";

export const model = (options?: ModelFieldOptions) => {
    return FieldModelTypeDecoratorFactory(
        {
            handlerClass: ModelHandler,
            optionsProcessor: new ModelFieldOptionProcessor(),
            typeHandlerId: TypeHandlerId,
            typeName: undefined,
        },
        options || {},
    );
};
