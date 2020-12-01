import { StringFieldOptions } from "./i-string-options";

import { FieldOptionProcessor } from "@tunnel-cast/core/field-option-processor";

export class StringFieldOptionProcessor extends FieldOptionProcessor {
    process(options: StringFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions };
    }
}
