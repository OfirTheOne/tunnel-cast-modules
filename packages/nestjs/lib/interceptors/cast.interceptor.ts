import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type
} from "@nestjs/common";
import { Request as eRequest } from "express";
import { Observable } from "rxjs";
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from "../constants";
import { InvalidCastException } from "../errors";

import { cast } from "@tunnel-cast/common/cast";
import { MetadataStorage } from "../storage";
import { CastModuleOptions } from "../interfaces";

export function CastInterceptor(
  model: any,
  fieldKey: string
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    constructor(
      @Inject(CAST_METADATA_STORAGE) public storage: MetadataStorage,
      @Optional() @Inject(CAST_MODULE_OPTIONS) public options: CastModuleOptions
    ) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const req: eRequest = ctx.getRequest();
      const res = ctx.getResponse();
      const castResult = cast(model, req[fieldKey]);
      if (castResult.errors) {
        throw new InvalidCastException(
          this.options.transformError(castResult.errors)
        );
      } else {
        req[fieldKey] = castResult.value;
      }
      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
