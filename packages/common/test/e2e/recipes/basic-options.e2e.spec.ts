import * as fieldType from "../../../lib/decorator/field-type";
import { Required, Default, Parsing } from "../../../lib/decorator/field-options";
import { cast } from "../../../lib/cast";

describe("Recipe : Basic Options", function () {
    class User {
        @fieldType.String({
            fallbackAttribute: "name",
        })
        username: string;

        @fieldType.String({
            format: /.+@.+\.com/,
        })
        email: string;

        @Required(false)
        @Default(false)
        @fieldType.Boolean()
        notificationOn: number;

        @fieldType.Array({
            validations: [(value) => value.length > 2 && value[1].startsWith("Rocky")],
            minLength: 1,
            maxLength: 15,
            ofType: "string",
        })
        favorites: Array<string>;

        @Parsing((value) => (typeof value == "string" ? value.toLowerCase() : value))
        @fieldType.String({
            enums: ["male", "female"],
        })
        gender: string;
    }

    it("Test case 01", function () {
        // ============ error case ============ //

        const bad_input_01 = {
            name: "Bob",
            email: "bob-gmail.com",
            favorites: ["Rocky 1", "Shoko 2", "Rocky 3", "Rocky 4", "Rocky 5"],
            gender: 2,
            notificationOn: 3,
        };

        const bad_result_01 = cast(User, bad_input_01);
        expect(bad_result_01.errors).toBeDefined();
        expect(bad_result_01.errors.length).toEqual(4);
        expect(bad_result_01.errors[0].fieldName).toEqual("email");
        expect(bad_result_01.errors[1].fieldName).toEqual("gender");
    });

    // ============ success case ============ //

    const good_input_01 = {
        name: "Bob",
        email: "bob@gmail.com",
        favorites: ["Rocky 1", "Rocky 2", "Rocky 3", "Rocky 4", "Rocky 5"],
        gender: "MALE",
    };

    const good_result_01 = cast(User, good_input_01);

    expect(good_result_01.errors).toBeDefined();

    expect(good_result_01.value).toHaveProperty(["username", "email", "favorites", "gender", "notificationOn"]);
    expect(good_result_01.value).toBeInstanceOf(User);

    expect(good_result_01.value.username).toEqual(good_input_01.name);
    expect(good_result_01.value.email).toEqual(good_input_01.email);
    expect(good_result_01.value.notificationOn).toEqual(false);
    expect(good_result_01.value.favorites).toEqual(good_input_01.favorites);
    expect(good_result_01.value.gender).toEqual(good_input_01.gender.toLowerCase());
});
