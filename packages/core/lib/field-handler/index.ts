import { BaseFieldOptions } from "../interfaces/field-options";
import { globals } from "../globals";
import { NativeValidationDict, NativeValidationEntry } from "../interfaces/native-validation-dict";

import { VerboseLevel } from "../utils/logger";
import {
    FieldRequiredError,
    AssertError,
    TypeConditionError,
    TypeValidationError,
    CustomValidationError,
} from "../errors";
import { Class } from "../utils/type-helpers";

// define description field for api documentation

// create function take the field options and type and create api documentation object

export abstract class FieldHandler<OP extends BaseFieldOptions = BaseFieldOptions> {
    logger = globals["LOGGER"];

    public abstract nativeValidations: NativeValidationDict<OP>;
    public abstract typeName: string;

    protected processedOptions: any;
    protected originValue: any;
    protected parsedValue: any;
    protected projectedValue: any;
    protected originValueExists: boolean;

    constructor(
        protected context: any,
        protected fieldName: string,
        protected projectedContext: any,
        protected parentModelRef: Class,
        protected options?: OP,
    ) {}

    public abstract typeCondition(): boolean;

    // - main driver
    public handle(options: OP) {
        try {
            const ops = this.processOption(this.options || options) as OP;
            this.processedOptions = ops;
            this.originValue = this.extractValue(ops);
            this.logger.log(`pass extraction stage`, VerboseLevel.High);

            this.originValueExists = this.evaluateOriginValueExistent();

            if (!this.originValueExists && ops.required == true) {
                throw new FieldRequiredError(this.fieldName, this.parentModelRef.name);
            }
            this.logger.log(`pass required-valuation stage`, VerboseLevel.High);

            // here pass required or nullable

            if (this.originValueExists) {
                // if exist
                // do assertion
                if (!this.applyAssertion(ops)) {
                    throw new AssertError(this.fieldName, this.parentModelRef.name, this.originValue, ops.assert); //Error('type assertion failed!');
                }
                this.logger.log(`pass assertion stage`, VerboseLevel.High);

                // do parsing
                this.parsedValue = this.runParsing(ops.parsing as Array<Function>);
                this.logger.log(`pass parsing stage`, VerboseLevel.High);

                if (!this.typeCondition()) {
                    // projectedValue, ops
                    throw new TypeConditionError(this.fieldName, this.parentModelRef.name, this.typeName);
                }
                this.logger.log(`pass type-validation stage`, VerboseLevel.High);

                // run validations
                if (this.originValueExists) {
                    this.projectedValue = this.parsedValue;
                    // run native validations
                    let nativeValidationPass = this.applyNativeValidation(ops);
                    if (Array.isArray(nativeValidationPass) && nativeValidationPass.length > 0) {
                        throw new TypeValidationError(nativeValidationPass);
                    }
                    this.logger.log(`pass native-validations stage`, VerboseLevel.High);

                    let providedValidationPass: boolean;
                    try {
                        providedValidationPass = this.runValidations(ops.validations as Array<Function>);
                    } catch (error) {
                        throw new CustomValidationError(error);
                    }
                    if (!providedValidationPass) {
                        throw new CustomValidationError(undefined);
                    }

                    this.logger.log(`pass extra-validations stage`, VerboseLevel.High);
                }

                // run transformations
                this.projectedValue = this.runTransformations(ops.transformations as Array<Function>);
            } else {
                // if not exist
                // apply default
                this.projectedValue = ops.default;
                this.logger.log(`assign default value ${ops.default}`, VerboseLevel.High);
            }

            this.projectedContext[this.fieldName] = this.projectedValue;
            this.logger.log(`assign projected-value to projected-context.`, VerboseLevel.High);

            return {
                context: this.context,
                projectedContext: this.projectedContext,
                fieldName: this.fieldName,
            };
        } catch (error) {
            return this.buildError(error, this.fieldName, this.originValue, options);
        }
    }

    // #region - apply in-house base logic
    protected extractValue(options: BaseFieldOptions): any {
        let value = this.context[options.attribute];

        if (options.fallbackAttribute) {
            if (!this.isValueExistent(value)) {
                value = this.context[options.fallbackAttribute];
                this.logger.log(`extract value using attribute ${options.fallbackAttribute}`, VerboseLevel.Medium);
            } else {
                this.logger.log(`extract value using attribute ${options.attribute}`, VerboseLevel.Medium);
            }
        }

        return value;
    }

    protected evaluateOriginValueExistent() {
        return this.isValueExistent(this.originValue);
    }

    protected isValueExistent(value: any): boolean {
        return value != undefined && value != null;
    }

    protected applyAssertion(options: OP) {
        let value = this.originValue;
        try {
            const { assert } = options;
            if (assert == undefined) {
                return true;
            } else {
                if (Array.isArray(assert)) {
                    if (!Array.isArray(value)) {
                        // value not an array & and assert is an array --> false
                        return false;
                    } else if (assert.length == 0) {
                        // value is an array & and assert is an empty array --> true
                        return true;
                    } else {
                        // value is an array & and assert is an array of some type  --> true
                        const [arrayAssert] = assert;
                        if (typeof arrayAssert == "string") {
                            // primitive type string
                            return value.every((item) => typeof item == arrayAssert);
                        } else {
                            // assert is a class type
                            return value.every((item) => item instanceof arrayAssert);
                        }
                    }
                } else {
                    // assert is non array type

                    if (typeof assert == "string") {
                        // primitive type string
                        return typeof value == assert;
                    } else {
                        // assert is a class type
                        return value instanceof assert;
                    }
                }
            }
        } catch (error) {
            throw error; // TODO : add assert error;
        }
    }

    protected applyNativeValidation(options: OP): boolean | Array<{ key: string; message: string }> {
        let value = this.projectedValue;
        const validations = Object.keys(options)
            .map(
                (key) =>
                    (key in this.nativeValidations ? [key, this.nativeValidations[key]] : undefined) as [
                        keyof OP,
                        NativeValidationEntry<OP>,
                    ],
            )
            .filter((val) => val != undefined);

        const foundErrors = validations
            .map(([key, validation]) =>
                !validation.condition(value, options[key], options)
                    ? { message: validation.message as string, key: key as string }
                    : undefined,
            )
            .filter((val) => val != undefined);

        return foundErrors.length > 0 ? foundErrors : true;
    }
    // #endregion

    // #region - apply provided logic
    protected runParsing(parsing: Array<Function>) {
        let value = this.originValue;
        const parsedValue = parsing.length == 0 ? value : parsing.reduce((val, pFunc) => pFunc(val), value);
        return parsedValue;
    }

    protected runValidations(validations: Array<Function>) {
        let value = this.projectedValue;
        let validationPass = true;
        for (let validation of validations) {
            validationPass = validation(value);
            if (!validationPass) {
                break;
            }
        }
        return validationPass;
    }

    protected runTransformations(transformations: Array<Function>) {
        let value = this.projectedValue;
        const transformedValue =
            transformations.length == 0 ? value : transformations.reduce((val, tFunc) => tFunc(val), value);
        return transformedValue;
    }
    // #endregion

    protected processOption(options: OP): BaseFieldOptions {
        let required =
            options.required == undefined
                ? options.nullable != undefined
                    ? !options.nullable
                    : globals.FIELD_REQUIRED_DEFAULT
                : options.required;

        let nullable = !required;

        return {
            attribute: options.attribute || this.fieldName,
            fallbackAttribute: options.fallbackAttribute,
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

    protected buildError(errors: Error | Array<Error>, fieldName: string, value: any, options: BaseFieldOptions) {
        errors = Array.isArray(errors) ? errors : [errors];
        return globals.DEBUG_ERROR ? { errors, fieldName, options, value } : { errors };
    }
}
