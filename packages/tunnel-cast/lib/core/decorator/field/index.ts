
import { number } from './number'
import { string } from './string'
import { boolean } from './boolean'
import { array } from './array'
import { model } from './model'

import { options } from './../field-option-setter'

export const field = {
    Number: number,
    String: string,
    Boolean: boolean,
    Array: array,
    Model: model,
    //
    options
}