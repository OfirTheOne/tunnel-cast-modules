import { ArgumentMetadata, PipeTransform, mixin, Type, Inject, Optional } from '@nestjs/common';
import { CastModuleOptions } from '../interfaces';
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from '../constants';
import { MetadataStorage } from '../storage';
import { castValue} from './cast-value';

export function CastPipeFactory<Result>(model?: Type<Result> | string, options?: any) {
  class MixinPipe implements PipeTransform<any, Result> {

    constructor(
      @Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage,             
      @Optional() @Inject(CAST_MODULE_OPTIONS) private options: CastModuleOptions,
    ) { }

    transform(value: any, metadata: ArgumentMetadata): Result {

      let appliedModel = typeof model == 'string' ? 
          (this.storage.map.get(model)?.model) : model;
      appliedModel = appliedModel || metadata.metatype;

      return castValue(value, appliedModel, this.options) as Result;
    }
  }

  const Pipe = mixin(MixinPipe);
  return Pipe as Type<PipeTransform<any, Result>>;
}



