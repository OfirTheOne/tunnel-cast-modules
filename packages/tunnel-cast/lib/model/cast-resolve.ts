export interface CastResolve<T> {
    value: T,
    originValue: any,
    errors? : Array<any>,
    options?: any
}