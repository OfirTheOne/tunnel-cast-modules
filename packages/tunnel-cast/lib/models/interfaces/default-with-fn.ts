export interface DefaultWithFn<Args = any, Val = any> {
    (constraintFnParams: { args: Args, fieldValue: any, fieldName: string, path: string, context: any}) : Val
}