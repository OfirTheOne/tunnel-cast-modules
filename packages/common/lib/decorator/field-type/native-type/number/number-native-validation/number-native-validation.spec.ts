import { BaseFieldOptions } from '@tunnel-cast/core/interfaces/field-options';
import { NativeValidationDict } from '@tunnel-cast/core/interfaces/native-validation-dict';
import { NumberFieldOptions } from '../i-number-options';
import { nativeValidations } from './number-native-validation';

describe('NumberHandler - nativeValidations', () => {

    const validationsDict = nativeValidations as Omit<NativeValidationDict<NumberFieldOptions>, keyof BaseFieldOptions>;

    it('max should return true', () => {
        const {
            max
        } = validationsDict

        const assertionParameters: Array<[number, number, boolean]> = [
            [4, 5, true],
            [-3, 0, true],
        ];

        for (let [value, validationValue, expectedResult] of assertionParameters) {
            expect(max.condition(value, validationValue, {})).toBe(expectedResult);
        }
    })

    it('max should return false', () => {
        const {
            max
        } = validationsDict;

        const assertionParameters: Array<[number, number, boolean]> = [
            [4, 2, false],
            [0, 0, false],
        ];

        for (let [value, validationValue, expectedResult] of assertionParameters) {
            expect(max.condition(value, validationValue, {})).toBe(expectedResult);
        }
    })

    it('min should return true', () => {
        const {
            min
        } = validationsDict

        const assertionParameters: Array<[number, number, boolean]> = [
            [4, 2, true],
            [0, 0, true],
        ];

        for (let [value, validationValue, expectedResult] of assertionParameters) {
            expect(min.condition(value, validationValue, {})).toBe(expectedResult);
        }
    })

    it('min should return false', () => {
        const {
            min
        } = validationsDict;

        const assertionParameters: Array<[number, number, boolean]> = [
            [4, 5, false],
            [-3, 0, false],
        ];

        for (let [value, validationValue, expectedResult] of assertionParameters) {
            expect(min.condition(value, validationValue, {})).toBe(expectedResult);
        }
    })
})