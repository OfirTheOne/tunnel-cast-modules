import { ModelFieldOptions } from "./i-model-options";

import { FieldOptionProcessor } from "@tunnel-cast/core/field-option-processor";

export class ModelFieldOptionProcessor extends FieldOptionProcessor {
    process(options: ModelFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions };
    }
}
