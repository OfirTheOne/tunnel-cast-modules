import { number } from "./number.decorator";
import { numberOptionDecorators } from './number-option-decorator'

/**
 * @description declare a Number type
 */
export const Number = Object.assign(number, numberOptionDecorators);
/**
 * @description declare a Number type
 * @alias Number
 */
export const Num = number;