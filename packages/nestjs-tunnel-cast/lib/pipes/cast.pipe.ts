import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, UsePipes, mixin, Type, Inject } from '@nestjs/common';
import { cast } from 'tunnel-cast/lib/common/cast';
import { CAST_METADATA_STORAGE } from '../constants';
import { MetadataStorage } from '../storage';

export function CastPipe<Result>(model: Type<Result>, options?: any) {
  class MixinPipe implements PipeTransform<any, Result> {

    constructor(@Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage) { }

    transform(value: any, metadata: ArgumentMetadata): Result {
      const result = cast(model, value)
      if (result.errors) {
        throw new BadRequestException(result.errors)
      }

      return result.value as Result;
    }
  }

  const Pipe = mixin(MixinPipe);
  return Pipe as Type<PipeTransform<any, Result>>;
}


