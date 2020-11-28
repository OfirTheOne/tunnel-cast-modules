import { PrimitiveType } from "../../../../../interfaces/inner/primitive-type";
import { BaseFieldOptions } from "../../../../../interfaces/public/field-options";

export interface NumberFieldOptions extends BaseFieldOptions{
    min?:  number;
    max?: number;
}
