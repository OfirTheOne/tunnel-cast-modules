import { ErrorCode } from "@tunnel-cast/core/enums/error-code.enum";
import { String, Boolean, Array } from "../../../lib/decorator/field-type";
import { Required, Default, Parsing, Validations, FallbackAttribute } from "../../../lib/decorator/field-options";
import { cast } from "../../../lib/cast";

describe("Recipe : Basic Options", function () {
    class User {
        @FallbackAttribute("name")
        @String()
        username: string;

        @String({
            format: /.+@.+\.com/,
        })
        email: string;

        @Required(false)
        @Default(false)
        @Boolean()
        notificationOn: number;

        @Validations((value) => value.length > 2 && value[1].startsWith("Rocky"))
        @Array({
            minLength: 1,
            maxLength: 15,
            ofType: "string",
        })
        favorites: Array<string>;

        @Parsing((value) => (typeof value == "string" ? value.toLowerCase() : value))
        @String({
            enums: ["male", "female"],
        })
        gender: string;
    }

    it("Cast User model - error case - inspect error ", function () {
        const bad_input_01 = {
            name: "Bob",
            email: "bob-gmail.com",
            favorites: ["Rocky 1", "Shoko 2", "Rocky 3", "Rocky 4", "Rocky 5"],
            gender: 2,
            notificationOn: 3,
        };
        const bad_result_01 = cast(User, bad_input_01);
        const expectedErrors = [
            { fieldName: "email", errorCode: ErrorCode.TypeValidationError },
            { fieldName: "notificationOn", errorCode: ErrorCode.TypeConditionError },
            { fieldName: "favorites", errorCode: ErrorCode.CustomValidationError },
            { fieldName: "gender", errorCode: ErrorCode.TypeConditionError },
        ];
        const actualErrors = bad_result_01.errors;

        expect(actualErrors).toBeDefined();
        expect(actualErrors.length).toEqual(expectedErrors.length);
        expectedErrors.forEach(({ fieldName, errorCode }, i) => {
            expect(actualErrors[i].fieldName).toEqual(fieldName);
            expect((actualErrors[i].errors[0] as any).code).toEqual(errorCode);
        });
    });

    it("Cast User model - success case - inspect result ", function () {
        const good_input_01 = {
            name: "Bob",
            email: "bob@gmail.com",
            favorites: ["Rocky 1", "Rocky 2", "Rocky 3", "Rocky 4", "Rocky 5"],
            gender: "MALE",
        };
        const expectedProperties = ["username", "email", "favorites", "gender", "notificationOn"];
        const good_result_01 = cast(User, good_input_01);

        expect(good_result_01.errors).toBeUndefined();

        expectedProperties.forEach((prop) => expect(good_result_01.value).toHaveProperty(prop));
        expect(good_result_01.value).toBeInstanceOf(User);

        expect(good_result_01.value.username).toEqual(good_input_01.name);
        expect(good_result_01.value.email).toEqual(good_input_01.email);
        expect(good_result_01.value.notificationOn).toEqual(false);
        expect(good_result_01.value.favorites).toEqual(good_input_01.favorites);
        expect(good_result_01.value.gender).toEqual(good_input_01.gender.toLowerCase());
    });
});
