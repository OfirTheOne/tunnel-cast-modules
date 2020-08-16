import { BaseFieldOptions } from "../../lib/model/field-options";



export type NativeValidationEntry<FO extends BaseFieldOptions, K extends keyof FO = keyof FO> = {
    condition: (
        value: any, 
        validationValue: FO[K], 
        ops: FO 
    ) => boolean;
    message: string | ((value: any, validationKey: K, validationValue: FO[K]) => string)
}

export type NativeValidationDict<FO extends BaseFieldOptions> = { 
    [key in keyof FO]: NativeValidationEntry<FO, key>
}