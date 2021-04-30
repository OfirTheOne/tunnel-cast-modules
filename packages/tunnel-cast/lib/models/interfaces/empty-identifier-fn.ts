export interface EmptyIdentifierFn<Args = any> {
    (constraintFnParams: { args: Args; fieldValue: any; fieldName: string; path: string }): boolean;
}
