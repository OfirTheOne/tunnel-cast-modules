
import { ModelFieldOptions } from "../../../../model"
import { FieldModelDecoratorFactory } from './factory';

export const model = (options?: ModelFieldOptions) => {
    return FieldModelDecoratorFactory(options||{})
}


