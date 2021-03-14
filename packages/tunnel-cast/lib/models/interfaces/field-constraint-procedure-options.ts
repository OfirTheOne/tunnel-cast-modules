export interface FieldConstraintProcedureOptions {
    if?: (value: any, context: any) => boolean,
    tags?: Array<string>,
    message?: string,
    iterate?: boolean,
    skipIfEmpty?: boolean
}