import { ErrorCode } from "./../enums/error-code.enum";

export class TunnelCastError extends Error {
    constructor(message: string, public code: string | number) {
        super(message);
    }
}

export class CastingError extends TunnelCastError {
    constructor(message: string, code: string | number, public description: string) {
        super(message, code);
    }

    toJSON() {
        return {
            message: this.message,
            code: this.code,
            description: this.description,
        };
    }
}

export interface ErrorWrapper {
    originError: any;
}

export class ModelMetadataRepoNotFoundError extends TunnelCastError {
    constructor(modelName: string) {
        super(`Metadata repository not found in "${modelName}."`, ErrorCode.ModelMetadataRepoNotFoundError);
    }
}

export class FieldRequiredError extends CastingError {
    constructor(fieldName: string, modelName: string) {
        super(
            "required validation failed.",
            ErrorCode.FieldRequiredError,
            `The field "${fieldName}" on model "${modelName}" failed required validation.`,
        );
    }
}

export class AssertError extends CastingError {
    constructor(fieldName: string, modelName: string, actualValue: any, expected: any) {
        super(
            "assertion failed.",
            ErrorCode.AssertError,
            `The field "${fieldName}" on model "${modelName}" failed assertion.\n` +
                `The value ${JSON.stringify(actualValue)} do not match the expects assertion ${JSON.stringify(
                    expected,
                )}.`,
        );
    }
}

export class TypeConditionError extends CastingError {
    constructor(fieldName: string, modelName: string, typeName: string) {
        super(
            `type condition failed.`,
            ErrorCode.TypeConditionError,
            `The field '${fieldName}' on model '${modelName}' failed type condition of ${typeName}.`,
        );
    }
}

export class TypeValidationError extends CastingError implements ErrorWrapper {
    constructor(public originError: any) {
        super(`native validation failed.`, ErrorCode.TypeValidationError, "");
    }

    toJSON() {
        return {
            ...super.toJSON(),
            originError: this.originError,
        };
    }
}

export class CustomValidationError extends CastingError implements ErrorWrapper {
    constructor(public originError: any) {
        super(`custom validation failed.`, ErrorCode.CustomValidationError, "");
    }

    toJSON() {
        return {
            ...super.toJSON(),
            originError: this.originError,
        };
    }
}
