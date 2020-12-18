import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";
import { NativeValidationDict } from "@tunnel-cast/core/interfaces/native-validation-dict";
import { StringFieldOptions } from "../i-string-options";
import { nativeValidations } from "./string-native-validation";

describe("StringHandler - nativeValidations", () => {
    const validationsDict = nativeValidations as Omit<NativeValidationDict<StringFieldOptions>, keyof BaseFieldOptions>;

    it("format should return true", () => {
        const { format } = validationsDict;

        const value = "Bob_hello";
        const validationValue = /^Bob.+$/;
        const expectedResult = true;

        expect(format.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("format should return false", () => {
        const { format } = validationsDict;

        const value = "John_hello";
        const validationValue = /^Bob.+$/;
        const expectedResult = false;

        expect(format.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("enums should return true", () => {
        const { enums } = validationsDict;

        const value = "ONE";
        const validationValue = ["ONE", "TWO", "THREE"];
        const expectedResult = true;

        expect(enums.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("enums should return false", () => {
        const { enums } = validationsDict;

        const value = "five";
        const validationValue = ["ONE", "TWO", "THREE"];
        const expectedResult = false;

        expect(enums.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("minLength should return true", () => {
        const { minLength } = validationsDict;

        const value = "five";
        const validationValue = 3;
        const expectedResult = true;

        expect(minLength.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("minLength should return false", () => {
        const { minLength } = validationsDict;

        const value = "five";
        const validationValue = 4;
        const expectedResult = false;

        expect(minLength.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("maxLength should return true", () => {
        const { maxLength } = validationsDict;

        const value = "five";
        const validationValue = 4;
        const expectedResult = true;

        expect(maxLength.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("maxLength should return false", () => {
        const { maxLength } = validationsDict;

        const value = "five";
        const validationValue = 3;
        const expectedResult = false;

        expect(maxLength.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("startsWith should return true", () => {
        const { startsWith } = validationsDict;

        const value = "five";
        const validationValue = "fi";
        const expectedResult = true;

        expect(startsWith.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("startsWith should return false", () => {
        const { startsWith } = validationsDict;

        const value = "five";
        const validationValue = "ni";
        const expectedResult = false;

        expect(startsWith.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("endsWith should return true", () => {
        const { endsWith } = validationsDict;

        const value = "five";
        const validationValue = "ive";
        const expectedResult = true;

        expect(endsWith.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("endsWith should return false", () => {
        const { endsWith } = validationsDict;

        const value = "five";
        const validationValue = "vee";
        const expectedResult = false;

        expect(endsWith.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("notIn should return true", () => {
        const { notIn } = validationsDict;

        const value = "five";
        const validationValue = ["ONE", "TWO", "THREE"];
        const expectedResult = true;

        expect(notIn.condition(value, validationValue, {})).toBe(expectedResult);
    });

    it("notIn should return false", () => {
        const { notIn } = validationsDict;

        const value = "THREE";
        const validationValue = ["ONE", "TWO", "THREE"];
        const expectedResult = false;

        expect(notIn.condition(value, validationValue, {})).toBe(expectedResult);
    });
});
