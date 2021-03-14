export interface FieldConstraintFn<Args> {
    (constraintFnParams: { args: Args, fieldValue: any, fieldName: string, path: string}) : boolean
}