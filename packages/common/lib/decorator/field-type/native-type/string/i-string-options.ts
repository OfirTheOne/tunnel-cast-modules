import { PrimitiveType } from "@tunnel-cast/core/interfaces/primitive-type";
import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";

export interface StringFieldOptions extends BaseFieldOptions {
    format?: string | RegExp;
    enums?: Array<string>;
    minLength?: number;
    maxLength?: number;
    startsWith?: string;
    endsWith?: string;
    notIn?: Array<string>;
}
