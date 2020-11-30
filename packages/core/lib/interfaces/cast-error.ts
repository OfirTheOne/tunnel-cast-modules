
export interface DebugCastError {
    errors: Array<CastError | Error>
    fieldName?: string,
    value?: any,
    options?: any,
}


// export interface LeanCastError {
//     errors: Array<CastError | Error>
// }


export type CastError = DebugCastError // | LeanCastError 