
import { 
    number,
    string,
    boolean,
    array
} from './native-type'
import { model } from './model'
import { options } from './../field-option-setter'
import { assert } from './assert';

export const field = {
    /**
     * @description declare a Number type 
     */
    Number: number,
    /**
     * @description declare a String type
     */
    String: string,
    /**
     * @description declare a Boolean type
     */
    Boolean: boolean,
    /**
     * @description declare a Array type
     */
    Array: array,
    /**
     * @description declare a Model type, inferred the mode class from the field type definition. 
     */
    Model: model,

    // ==== //
    
    /**
     * @description declare the type (primitive / class) of the origin field value, and assert it
     */
    Assert: assert,
    /**
     * @description provide access to the field-type's options object.
     */
    options
}