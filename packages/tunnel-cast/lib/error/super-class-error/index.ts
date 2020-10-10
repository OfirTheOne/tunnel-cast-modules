
export class TunnelCastError  extends Error {

    constructor(message: string, public code: string|number, public description?: string) {
        super(message);
    }
}


export class CastingError extends TunnelCastError {

    constructor(
        message: string, 
        code: string|number, 
        context?: { modelName: string, fieldName: string, fieldOptions: any, parentRef: any}
    ) {
        super(
            message,
            code
        );
    }   
}


export interface ErrorWrapper {
    originError: any;
}