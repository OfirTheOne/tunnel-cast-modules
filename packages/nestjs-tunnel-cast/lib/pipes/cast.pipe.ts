import { ArgumentMetadata, Injectable, PipeTransform, Type, Inject, Optional } from '@nestjs/common';
import { CastModuleOptions } from '../interfaces';
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from '../constants';
import { MetadataStorage } from '../storage';
import { CastPipeTransformValue } from '../interfaces/cast-pipe-transform-value';

import { castValue} from './cast-value';


/*
export function CasssssstPipe<Result>(model?: Type<Result>, options?: any) {
  class MixinPipe implements PipeTransform<any, Result> {

    constructor(@Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage) { }

    transform(value: any, metadata: ArgumentMetadata): Result {

      const modelId = metadata.data;

      if(typeof modelId == 'string') {

      }
      const appliedModel = model || metadata.metatype 
      const result = cast(appliedModel, value)
      if (result.errors) {
        throw new BadRequestException(result.errors)
      }

      return result.value as Result;
    }
  }

  const Pipe = mixin(MixinPipe);
  return Pipe as Type<PipeTransform<any, Result>>;
}

*/


@Injectable()
export class CastPipe<Result = any> implements PipeTransform<any, Result> {

    constructor(
      @Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage,
      @Optional() @Inject(CAST_MODULE_OPTIONS) private options: CastModuleOptions,
    ) { }

    transform(value: CastPipeTransformValue, metadata: ArgumentMetadata): Result {
      const { extractedValue } = value;

      let model: Type<any>;
      if(typeof metadata.data == 'string') {
        const modelId = metadata.data;
        model = this.storage.map.get(modelId)?.model;
      } else if(metadata.data != undefined && 'prototype' in metadata.data) {
        model = metadata.data;
      } else {
        model = metadata.metatype;
      }


      const appliedModel = model;
      return castValue(extractedValue, appliedModel, this.options) as Result;

    }
  }

