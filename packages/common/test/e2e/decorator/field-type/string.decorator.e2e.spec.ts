import * as field from "../../../../lib/decorator/field-type";
import { cast } from "../../../../lib/cast";

describe("Feature : @field.String", function () {
    class _TestClass01 {
        @field.String()
        someString: string;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someString: [],
        };

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        // ============ success case ============ //

        const good_input_01 = {
            someString: "hello",
        };

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty("someString");
        expect(good_result_01.value).toBeInstanceOf(_TestClass01);
        expect(good_result_01.value.someString).toEqual(good_input_01.someString);
    });

    class _TestClass02 {
        @field.String({
            required: true,
            format: /^.+(cast)$/,
        })
        someString: string;
    }

    it("Test case 02", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someString: 40,
        };
        const bad_input_02 = {
            someString: "tunnel-cas___t",
        };
        const bad_input_03 = {
            someString: undefined,
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
            someString: "tunnel-cast",
        };

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).toBeUndefined;
        expect(good_result_01.value).toHaveProperty("someString");
        expect(good_result_01.value).toBeInstanceOf(_TestClass02);
        expect(good_result_01.value.someString).toEqual(good_input_01.someString);
    });

    class _TestClass03 {
        @field.String({
            required: false,
            enums: ["tunnel", "cast", "tunnel-cast"],
        })
        someString: String;
    }

    it("Test case 03", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello",
        };
        const bad_input_02 = {
            someString: 60,
        };

        const bad_result_01 = cast(_TestClass03, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        const bad_result_02 = cast(_TestClass03, bad_input_02);
        expect(Array.isArray(bad_result_02.errors)).toBeTruthy();
        expect(bad_result_02.errors.length).toEqual(1);

        // ============ success case ============ //

        const good_input_01 = {
            someString: undefined,
        };
        const good_input_02 = {
            someString: "tunnel",
        };

        const good_result_01 = cast(_TestClass03, good_input_01);
        expect(good_result_01.errors).toBeUndefined;
        expect(good_result_01.value).toHaveProperty("someString");
        expect(good_result_01.value).toBeInstanceOf(_TestClass03);
        expect(good_result_01.value.someString).toEqual(good_input_01.someString);

        const good_result_02 = cast(_TestClass03, good_input_02);
        expect(good_result_02.errors).toBeUndefined;
        expect(good_result_02.value).toHaveProperty("someString");
        expect(good_result_02.value).toBeInstanceOf(_TestClass03);
        expect(good_result_02.value.someString).toEqual(good_input_02.someString);
    });
});
