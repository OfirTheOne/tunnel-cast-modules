import { BooleanFieldOptions } from "./i-boolean-options";

import { FieldOptionProcessor } from "@tunnel-cast/core/field-option-processor";

export class BooleanFieldOptionProcessor extends FieldOptionProcessor {
    process(options: BooleanFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions };
    }
}
