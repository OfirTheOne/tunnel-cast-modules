
import { CastError } from './cast-error'

export interface CastResolve<T> {
    value: T,
    originValue: any,
    errors? : Array<CastError>,
    options?: any
}


