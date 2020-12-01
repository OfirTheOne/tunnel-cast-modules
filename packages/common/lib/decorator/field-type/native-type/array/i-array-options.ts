import { PrimitiveType } from "@tunnel-cast/core/interfaces/primitive-type";
import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";

export interface ArrayFieldOptions extends BaseFieldOptions {
    minLength?: number;
    maxLength?: number;
    ofType?: PrimitiveType;
    allowType?: Array<PrimitiveType>;
}
