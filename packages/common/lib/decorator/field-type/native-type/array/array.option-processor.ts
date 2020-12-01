import { ArrayFieldOptions } from "./i-array-options";

import { FieldOptionProcessor } from "@tunnel-cast/core/field-option-processor";

export class ArrayFieldOptionProcessor extends FieldOptionProcessor {
    process(options: ArrayFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions };
    }
}
