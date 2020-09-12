




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

    constructor(modelName: string) {
        super(
            `Metadata repository not found in "${modelName}."`,
            'FieldRequiredError'
        );
    }   
}

export class AssertError extends CastingError {

    constructor() {
        super(
            `Assertion failed."`,
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

