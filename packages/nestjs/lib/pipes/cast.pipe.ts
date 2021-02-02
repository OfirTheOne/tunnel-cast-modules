import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
  Inject,
  Optional
} from "@nestjs/common";
import { CastModuleOptions } from "../interfaces";
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from "../constants";
import { MetadataStorage } from "../storage";
import { CastPipeTransformValue } from "../interfaces/cast-pipe-transform-value";

import { castValue } from "./cast-value";

@Injectable()
export class CastPipe<Result = any> implements PipeTransform<any, Result> {
  constructor(
    @Inject(CAST_METADATA_STORAGE) private storage: MetadataStorage,
    @Optional() @Inject(CAST_MODULE_OPTIONS) private options: CastModuleOptions
  ) {}

  transform(value: CastPipeTransformValue, metadata: ArgumentMetadata): Result {
    const { extractedValue } = value;

    let model: Type<any>;
    if (typeof metadata.data == "string") {
      const modelId = metadata.data;
      model = this.storage.map.get(modelId)?.model;
    } else if (metadata.data != undefined && "prototype" in metadata.data) {
      model = metadata.data;
    } else {
      model = metadata.metatype;
    }

    const appliedModel = model;
    return castValue(extractedValue, appliedModel, this.options) as Result;
  }
}
