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
