import { PrimitiveType } from "@tunnel-cast/core/interfaces/primitive-type";
import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";

export interface NumberFieldOptions extends BaseFieldOptions {
    min?: number;
    max?: number;
}
