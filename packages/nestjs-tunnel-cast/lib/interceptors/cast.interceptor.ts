import {
    CallHandler,
    ExecutionContext,
    Inject,
    mixin,
    NestInterceptor,
    Optional,
    Type,
} from '@nestjs/common';
import { Request as eRequest } from 'express'
import { Observable } from 'rxjs';
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from '../constants';
import { InvalidCastException } from './../errors';

import { cast } from 'tunnel-cast/dist-prod/common'
import { MetadataStorage } from '../storage';

export function CastInterceptor(model: any, fieldKey: string): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {

        constructor(
            @Optional() @Inject(CAST_MODULE_OPTIONS) options: any = {},
            @Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage
        ) { }

        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const ctx = context.switchToHttp();
            const req: eRequest = ctx.getRequest();
            const res = ctx.getResponse();
            const castResult = cast(model, req[fieldKey])
            if (castResult.errors) {
                throw new InvalidCastException(fieldKey, castResult.errors);
            } else {
                req[fieldKey] = castResult.value;
            }
            return next.handle()
        }
    }
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
}