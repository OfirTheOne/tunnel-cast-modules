import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { StringFieldOptions } from "../i-string-options";



export const  nativeValidations: NativeValidationDict<StringFieldOptions> = {
    format: {
        condition: (value, format) => new RegExp(format).test(value),
        message: "format failed",
    },
    enums: {
        condition: (value, enums) => enums.length == 0 || enums.includes(value),
        message: "enums failed",
    },
    notIn: {
        condition: (value, valueList) => valueList.length == 0 || !valueList.includes(value),
        message: "notIn failed",
    },
    maxLength: {
        condition: (value, maxLen) => typeof value == 'string' && value.length <= maxLen,
        message: "maxLength failed",
    },
    minLength: {
        condition: (value, minLen) => typeof value == 'string' && value.length > minLen,
        message: "minLength failed",
    },
    startsWith: {
        condition: (value, prefix) => typeof value == 'string' && value.startsWith(prefix),
        message: "startsWith failed",
    },
    endsWith: {
        condition: (value, suffix) => typeof value == 'string' && value.endsWith(suffix),
        message: "endsWith failed",
    },
};