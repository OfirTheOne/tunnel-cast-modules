import { PrimitiveType } from "../../../../../interfaces/inner/primitive-type";
import { BaseFieldOptions } from "../../../../../interfaces/public/field-options";

export interface ArrayFieldOptions extends BaseFieldOptions{
    minLength?: number
    maxLength?: number
    ofType?: PrimitiveType
    allowType?: Array<PrimitiveType>
}

