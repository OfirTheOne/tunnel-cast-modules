import * as OPS from "../interfaces/field-options";
import { globals } from "../globals";

export class FieldOptionProcessor<T extends OPS.BaseFieldOptions = OPS.BaseFieldOptions> {
    process(options: T, fieldName: string) {
        let required =
            options.required == undefined
                ? options.nullable != undefined
                    ? !options.nullable
                    : globals.FIELD_REQUIRED_DEFAULT
                : options.required;

        let nullable = !required;

        return {
            attribute: options.attribute || fieldName,
            fallbackAttribute: options.fallbackAttribute,
            assert: options.assert,
            validate: options.validate,
            transformations: options.transformations || [],
            validations: options.validations || [],
            parsing: options.parsing || [],
            required,
            nullable,
            nullableIf: options.nullableIf,
            requiredIf: options.requiredIf,
            error: options.error,
            default: options.default,
        };
    }
}
