
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
    Number: number,
    String: string,
    Boolean: boolean,
    Array: array,
    Model: model,
    //
    Assert: assert,
    options
}