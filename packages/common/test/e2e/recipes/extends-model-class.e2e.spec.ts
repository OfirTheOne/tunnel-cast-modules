import * as fieldType from "../../../lib/decorator/field-type";
import { cast } from "../../../lib/cast";

describe("Recipe : extends-model-class", function () {
    class SuperClass {
        @fieldType.String()
        name: string;

        @fieldType.Number({ min: 20 })
        age: number;

        @fieldType.String({ enums: ["Admin", "Standard"] })
        role: string;
    }

    class SubClass extends SuperClass {
        @fieldType.Array({ ofType: "string" })
        favoriteMovies: Array<string>;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            name: 50,
            age: 30,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"],
        };

        const bad_input_02 = {
            name: 50,
            age: 10,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"],
        };

        const bad_input_03 = {
            name: "Bob",
            age: 10,
            role: "Standard",
            favoriteMovies: "A",
        };

        const bad_result_01 = cast(SubClass, bad_input_01);
        expect(bad_result_01.errors).toBeDefined();
        expect(bad_result_01.errors.length).toEqual(1);

        const bad_result_02 = cast(SubClass, bad_input_02);
        expect(bad_result_02.errors).toBeDefined();
        expect(bad_result_02.errors.length).toEqual(2);

        const bad_result_03 = cast(SubClass, bad_input_03);
        expect(bad_result_03.errors).toBeDefined();
        expect(bad_result_03.errors.length).toEqual(2);

        // ============ success case ============ //

        const good_input_01 = {
            name: "Bob",
            age: 30,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"],
        };

        const good_result_01 = cast(SubClass, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toBeInstanceOf(SubClass);
        expect(good_result_01.value).toEqual(good_input_01);
    });
});
