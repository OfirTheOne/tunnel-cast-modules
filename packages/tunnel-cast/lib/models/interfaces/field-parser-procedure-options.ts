export interface FieldParserProcedureOptions {
    if?: (value: any, context: any) => boolean,
    tags?: Array<string>,
    skipIfEmpty?: boolean
}