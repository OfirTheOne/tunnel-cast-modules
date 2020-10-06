import { CastInterceptorFactory } from "./cast-interceptor-factory"


export const CastQueryInterceptor = CastInterceptorFactory('query')
export const CastParamInterceptor = CastInterceptorFactory('param')
export const CastBodyInterceptor = CastInterceptorFactory('body')
export const CastHeaderInterceptor = CastInterceptorFactory('headers')