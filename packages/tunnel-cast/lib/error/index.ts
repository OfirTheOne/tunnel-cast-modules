

import { ErrorCode } from './error-code.enum'
import { TunnelCastError, CastingError, ErrorWrapper } from './super-class-error'


export class ModelMetadataRepoNotFoundError extends TunnelCastError {

    constructor(modelName: string) {
        super(
            `Metadata repository not found in "${modelName}."`,
            ErrorCode.ModelMetadataRepoNotFoundError,
        );
    }   
}



export class FieldRequiredError extends CastingError {

    constructor(fieldName: string, modelName: string) {
        super(
            `The field "${fieldName}" on the model "${modelName}" failed required validation.`,
            ErrorCode.FieldRequiredError
        );
    }   
}

export class AssertError extends CastingError {

    constructor(fieldName: string, modelName: string, actualValue: any, expected: any) {
        super(
            `The field "${fieldName}" on the model "${modelName}" failed assertion.\n` +
            `The value ${JSON.stringify(actualValue)} do not match the expects assertion ${JSON.stringify(expected)}.`,
            ErrorCode.AssertError
        );
    }   
}

export class TypeConditionError extends CastingError {

    constructor() {
        super(
            `Type condition failed.`,
            ErrorCode.TypeConditionError
        );
    }   
}

export class TypeValidationError extends CastingError {

    constructor() {
        super(
            `Type validation failed.`,
            ErrorCode.TypeValidationError
        );
    }   
}

export class NativeValidationError extends CastingError implements ErrorWrapper {

    constructor(public originError: any) {
        super(
            `native validation failed.`,
            ErrorCode.TypeValidationError
        );
    }
}


export class ProvidedValidationError extends CastingError implements ErrorWrapper {

    constructor(public originError: any) {
        super(
            `provided validation failed.`,
            ErrorCode.TypeValidationError
        );
    }
}
