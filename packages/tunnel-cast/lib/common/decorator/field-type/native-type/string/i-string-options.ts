import { PrimitiveType } from "../../../../../interfaces/inner/primitive-type";
import { BaseFieldOptions } from "../../../../../interfaces/public/field-options";

export interface StringFieldOptions extends BaseFieldOptions{
    format?: string | RegExp;
    enums?: Array<string>
}
