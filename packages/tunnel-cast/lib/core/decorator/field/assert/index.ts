
import { FieldOptionSetterDecoratorFactory } from './../../field-option-setter/factory'

export const assert = function(value) {
    return FieldOptionSetterDecoratorFactory('assert', value);
} 