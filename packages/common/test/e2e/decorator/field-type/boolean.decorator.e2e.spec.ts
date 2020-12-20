import * as fieldType from "../../../../lib/decorator/field-type";
import { cast } from "../../../../lib/cast";

describe("Feature : @fieldType.Boolean", function () {
    class _TestClass01 {
        @fieldType.Boolean()
        someBoolean: boolean;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someBoolean: "hello",
        };

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        // ============ success case ============ //

        const good_input_01 = {
            someBoolean: true,
        };

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty("someBoolean");
        expect(good_result_01.value).toBeInstanceOf(_TestClass01);
        expect(good_result_01.value.someBoolean).toEqual(good_input_01.someBoolean);
    });

    class _TestClass02 {
        @fieldType.Boolean({
            required: false,
            default: false,
        })
        someBoolean: boolean;
    }

    it("Test case 02", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someBoolean: "hello",
        };

        const bad_result_01 = cast(_TestClass02, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);
        // ============ success case ============ //

        const good_input_01 = {
            someBoolean: true,
        };

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty("someBoolean");
        expect(good_result_01.value).toBeInstanceOf(_TestClass02);
        expect(good_result_01.value.someBoolean).toEqual(good_input_01.someBoolean);

        const good_input_02 = {
            someBoolean: undefined,
        };

        const good_result_02 = cast(_TestClass02, good_input_02);
        expect(good_result_02.errors).toBeUndefined();
        expect(good_result_02.value).toHaveProperty("someBoolean");
        expect(good_result_02.value).toBeInstanceOf(_TestClass02);
        expect(good_result_02.value.someBoolean).toEqual(false);
    });
});
