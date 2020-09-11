
import * as OPS from './../../model/public/field-options'
import { globals } from '../../globals';

export class FieldOptionProcessor<T extends OPS.BaseFieldOptions = OPS.BaseFieldOptions> {
    process(options: T, fieldName: string) {
        let required = options.required == undefined ?
            (options.nullable != undefined ? !options.nullable : globals.FIELD_REQUIRED_DEFAULT) :
            options.required;

        let nullable = !required

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
            default: options.default
        }
    }
}


export class NumberFieldOptionProcessor extends FieldOptionProcessor<OPS.NumberFieldOptions> {
    
    process(options: OPS.NumberFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}

export class StringFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.StringFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}

export class BooleanFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.BooleanFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}

export class ArrayFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.ArrayFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}

export class ModelFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.ModelFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}