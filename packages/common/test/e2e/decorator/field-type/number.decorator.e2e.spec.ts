import * as field from "../../../../lib/decorator/field-type";
import { cast } from "../../../../lib/cast";

describe("Feature : @field.Number", function () {
    class _TestClass01 {
        @field.Number()
        someNumber: number;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello",
        };

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);
        // ============ success case ============ //

        const good_input_01 = {
            someNumber: 50,
        };

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).toBeUndefined;
        expect(good_result_01.value).toHaveProperty("someNumber");
        expect(good_result_01.value).toBeInstanceOf(_TestClass01);
        expect(good_result_01.value.someNumber).toEqual(good_input_01.someNumber);
    });

    class _TestClass02 {
        @field.Number({
            min: 20,
            max: 55,
        })
        someNumber: number;
    }

    it("Test case 02", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello",
        };
        const bad_input_02 = {
            someNumber: 60,
        };
        const bad_input_03 = {
            someNumber: 12,
        };

        const bad_result_01 = cast(_TestClass02, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        const bad_result_02 = cast(_TestClass02, bad_input_02);
        expect(Array.isArray(bad_result_02.errors)).toBeTruthy();
        expect(bad_result_02.errors.length).toEqual(1);

        const bad_result_03 = cast(_TestClass02, bad_input_03);
        expect(Array.isArray(bad_result_03.errors)).toBeTruthy();
        expect(bad_result_03.errors.length).toEqual(1);

        // ============ success case ============ //

        const good_input_01 = {
            someNumber: 50,
        };

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty("someNumber");
        expect(good_result_01.value).toBeInstanceOf(_TestClass02);
        expect(good_result_01.value.someNumber).toEqual(good_input_01.someNumber);
    });

    class _TestClass03 {
        @field.Number({
            required: false,
            max: 55,
        })
        someNumber: number;
    }

    it("Test case 03", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello",
        };
        const bad_input_02 = {
            someNumber: 60,
        };

        const bad_result_01 = cast(_TestClass03, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        const bad_result_02 = cast(_TestClass03, bad_input_02);
        expect(Array.isArray(bad_result_02.errors)).toBeTruthy();
        expect(bad_result_02.errors.length).toEqual(1);

        // ============ success case ============ //

        const good_input_01 = {
            someNumber: undefined,
        };
        const good_input_02 = {
            someNumber: 12,
        };

        const good_result_01 = cast(_TestClass03, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty("someNumber");
        expect(good_result_01.value).toBeInstanceOf(_TestClass03);
        expect(good_result_01.value.someNumber).toEqual(good_input_01.someNumber);

        const good_result_02 = cast(_TestClass03, good_input_02);
        expect(good_result_02.errors).toBeUndefined();
        expect(good_result_02.value).toHaveProperty("someNumber");
        expect(good_result_02.value).toBeInstanceOf(_TestClass03);
        expect(good_result_02.value.someNumber).toEqual(good_input_02.someNumber);
    });
});
