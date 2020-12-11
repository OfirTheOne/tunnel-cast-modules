import { string } from "./string.decorator";
import { stringOptionDecorators } from "./string-option-decorator";

/**
 * @description declare a String type
 */
export const String = Object.assign(string, stringOptionDecorators);
/**
 * @description declare a String type
 * @alias String
 */
export const Str = string;
