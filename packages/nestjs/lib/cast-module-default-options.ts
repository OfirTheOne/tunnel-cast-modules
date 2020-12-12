import { InvalidCastException } from "./errors";
import { CastModuleOptions } from "./interfaces";
import { transformLeanError } from "./utils/transform-lean-error";

export const defaultOptions: CastModuleOptions = {
  castError: InvalidCastException,
  transformError: transformLeanError
};
