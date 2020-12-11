import { array } from "./array.decorator";
import { arrayOptionDecorators } from './array-option-decorator';

/**
 * @description declare a Array type
 */
export const Array = Object.assign(array, arrayOptionDecorators);
/**
 * @description declare a Array type
 * @alias Array
 */
export const Arr = array;