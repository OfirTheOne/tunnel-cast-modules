import { BadRequestException, Type } from "@nestjs/common";
import { cast } from "tunnel-cast/dist/lib/common";
import { InvalidCastException } from "../errors";
import { CastModuleOptions } from "../interfaces";

export function castValue<T>(value: any, model: Type<T>, options: CastModuleOptions) {
    const result = cast(model, value)
    if (result.errors) {
      throw new (options.castError)(JSON.stringify(options.transformError(result.errors), undefined, 2))
    }

    return result.value;
}