

import { optionsSetter } from '../field-options/option-setter';
import { assert, _default, required } from '../field-options/option-wrapper';



    // ==== //
    
/**
 * @description set the default value of the field 
 */
export const Default = _default;

/**
 * @description set the required status of the field 
 */
export const Required = required;

/**
 * @description declare the type (primitive / class) of the origin field value, and assert it
 */
export const AssertType = assert;

/**
 * @description provide access to the field-type's options object.
 */
export const OptionSetter = optionsSetter;