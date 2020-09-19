




export class TunnelCastError  extends Error {

    constructor(message: string, public code: string, description?: string) {
        super(message);
    }
}



export class ModelMetadataRepoNotFoundError extends TunnelCastError {

    constructor(modelName: string) {
        super(
            `Metadata repository not found in "${modelName}."`,
            `ModelMetadataRepoNotFoundError`,
        );
    }   
}



export class CastingError extends TunnelCastError {

    constructor(
        message: string, 
        code: string, 
        context?: { modelName: string, fieldName: string, fieldOptions: any, parentRef: any}
    ) {
        super(
            message,
            code
        );
    }   
}

export class FieldRequiredError extends CastingError {

    constructor(fieldName: string, modelName: string) {
        super(
            `The field "${fieldName}" on the model "${modelName}" failed required validation.`,
            'FieldRequiredError'
        );
    }   
}

export class AssertError extends CastingError {

    constructor(fieldName: string, modelName: string, actualValue: any, expected: any) {
        super(
            `The field "${fieldName}" on the model "${modelName}" failed assertion.\n` +
            `The value ${JSON.stringify(actualValue)} do not match the expects assertion ${JSON.stringify(expected)}.`,
            'AssertError'
        );
    }   
}

export class TypeConditionError extends CastingError {

    constructor(modelName: string) {
        super(
            `Type condition failed."`,
            'TypeConditionError'
        );
    }   
}

export class TypeValidationError extends CastingError {

    constructor(modelName: string) {
        super(
            `Metadata repository not found in "${modelName}."`,
            'TypeValidationError'
        );
    }   
}

