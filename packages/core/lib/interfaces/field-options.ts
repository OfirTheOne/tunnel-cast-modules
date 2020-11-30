

import { PrimitiveType } from './primitive-type'
import { Class } from '../utils/type-helpers';

export interface FieldOptions {}

export interface BaseFieldOptions extends FieldOptions {
    /* 
     * default: same as the decorated attribute
     **/
    attribute?: string; 

    /* 
     * default: undefined
     **/
    fallbackAttribute?: string; 

    /**
     * default: undefined
     * assert the type of the incoming origin input.
     */
    assert?: (Class | PrimitiveType | Array<(Class | PrimitiveType)>)

    /* 
     * default: true
     **/
    validate?: boolean; 
    /* 
     * default: true
     * override requiredIf, nullable, nullableIf, .
     **/
    required?: boolean; 
    /* 
     * default: undefined
     * override nullable, nullableIf, .
     **/
    requiredIf?: Function; 
    /* 
     * default: false
     * override nullableIf, .
     **/
    nullable?: boolean; 
    /* 
     * default: undefined
     **/
    nullableIf?: Function; 
    /* 
     * default: undefined
     **/
    default?: any;   
    
    /* 
     * default: general error massage
     **/
    error?: string | Function

    /* 
     * note: 
     * will run if pass required / nullable validation, 
     * and before any other validation / transformation will run.
     **/

    parsing?: Array<Function|string /* registered parsing key */ >

    /* 
     * note: 
     * will run if all native validation pass and after.
     **/
    validations?: Array<Function|string /* registered validation key */ >

    /* 
     * note: 
     * will run if all validation pass and after.
     **/
    transformations? : Array<Function|string /* registered transformations key */ >

}






