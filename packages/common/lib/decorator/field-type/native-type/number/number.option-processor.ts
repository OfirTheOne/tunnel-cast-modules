import { NumberFieldOptions } from "./i-number-options";

import { FieldOptionProcessor } from "@tunnel-cast/core/field-option-processor";

export class NumberFieldOptionProcessor extends FieldOptionProcessor<NumberFieldOptions> {
    process(options: NumberFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions };
    }
}
