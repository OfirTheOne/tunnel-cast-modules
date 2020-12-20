import * as field from "../../../../lib/decorator/field-type";
import { cast } from "../../../../lib/cast";

describe("Feature : @field.Model", function () {
    class _NestedClass01 {
        @field.String()
        name: string;

        @field.Number()
        age: number;
    }

    class _TestClass01 {
        @field.Model()
        person: _NestedClass01;

        @field.String()
        description: string;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            person: {
                name: 20,
            },
            description: "sone string",
        };

        const bad_input_02 = {
            person: {
                name: "Bob",
                age: 30,
            },
            description: [undefined],
        };

        const bad_input_03 = {
            person: {
                name: 30,
                age: 30,
            },
            description: [undefined],
        };

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(Array.isArray(bad_result_01.errors)).toBeTruthy();
        expect(bad_result_01.errors.length).toEqual(1);

        const bad_result_02 = cast(_TestClass01, bad_input_02);
        expect(Array.isArray(bad_result_02.errors)).toBeTruthy();
        expect(bad_result_02.errors.length).toEqual(1);

        const bad_result_03 = cast(_TestClass01, bad_input_03);
        expect(Array.isArray(bad_result_03.errors)).toBeTruthy();
        expect(bad_result_03.errors.length).toEqual(2);
        // ============ success case ============ //

        const good_input_01 = {
            person: {
                name: "Bob",
                age: 30,
            },
            description: "sone string",
        };

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toBeInstanceOf(_TestClass01);
        expect(good_result_01.value).toEqual(good_input_01);
    });
});
