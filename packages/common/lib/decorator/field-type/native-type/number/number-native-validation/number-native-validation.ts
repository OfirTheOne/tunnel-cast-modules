import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { NumberFieldOptions } from "../i-number-options";

export const nativeValidations: NativeValidationDict<NumberFieldOptions> = {
    max: {
        condition: (value, max) => value < max,
        message: "max failed",
    },
    min: {
        condition: (value, min) => value >= min,
        message: "min failed",
    },
};
