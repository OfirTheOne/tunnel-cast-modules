import { CastInterceptor } from "./cast-interceptor";

export function CastInterceptorFactory(fieldKey: string) {
    return (model: any) => CastInterceptor(model, fieldKey)
}


