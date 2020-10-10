
import { ModelFieldOptions } from "../../../../interfaces"
import { FieldModelDecoratorFactory } from './factory';

export const model = (options?: ModelFieldOptions) => {
    return FieldModelDecoratorFactory(options||{})
}


