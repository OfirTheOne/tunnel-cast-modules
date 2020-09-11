

import { PrimitiveType } from '../inner/primitive-type'
import { Class } from 'lib/utils/model';

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

export interface NumberFieldOptions extends BaseFieldOptions{
    min?:  number;
    max?: number;
}

export interface StringFieldOptions extends BaseFieldOptions{
    format?: string | RegExp;
    enums?: Array<string>
}

export interface BooleanFieldOptions extends BaseFieldOptions{
}

export interface ArrayFieldOptions extends BaseFieldOptions{
    minLength?: number
    maxLength?: number
    ofType?: PrimitiveType
    allowType?: Array<PrimitiveType>
}


export interface ModelFieldOptions extends BaseFieldOptions{
    modelClass?: Class
}





