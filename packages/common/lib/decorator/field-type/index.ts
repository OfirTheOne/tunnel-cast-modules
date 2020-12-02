import { number } from "./native-type/number";
import { string } from "./native-type/string";
import { boolean } from "./native-type/boolean";
import { array } from "./native-type/array";
import { model } from "./model";

/**
 * @description declare a Number type
 */
export const Number = number;
/**
 * @description declare a String type
 */
export const String = string;
/**
 * @description declare a Boolean type
 */
export const Boolean = boolean;
/**
 * @description declare a Array type
 */
export const Array = array;
/**
 * @description declare a Model type, inferred the mode class from the field type definition.
 */
export const Model = model;