import { expect } from 'chai';

import { field } from '../../../lib/core/decorator';
import { cast } from '../../../lib/core/cast';



describe("Feature : Base Options", function () {
    class User {
        @field.String({
            fallbackAttribute: "name"
        })
        username: string;

        @field.String({
            format: /.+@.+\.com/
        })
        email: string;

        @field.Boolean({
            required: false,
            default: false
        })
        notificationOn: number;

        @field.Array({
            validations: [(value) => value.length > 2 && value[1].startsWith('Rocky')],
            minLength: 1,
            maxLength: 15,
            ofType: 'string'
        })
        favorites: Array<string>

        @field.String({
            parsing: [(value) => (typeof value == 'string' ? value.toLowerCase() : value)],
            enums: ['male', 'female'],
        })
        gender: string
    }


    it("Test case 01", function () {


        // ============ error case ============ //

        const bad_input_01 = {
            name: "Bob",
            email: "bob-gmail.com",
            favorites: ["Rocky 1", "Shoko 2", "Rocky 3", "Rocky 4", "Rocky 5"],
            gender: 2,
            notificationOn: 3
        }


        const bad_result_01 = cast(User, bad_input_01);
        expect(bad_result_01.errors).to.be.an('array').of.length(4)
        expect(bad_result_01.errors[0].fieldName).eqls("email")
        expect(bad_result_01.errors[1].fieldName).eqls("notificationOn")
        expect(bad_result_01.errors[2].fieldName).eqls("favorites")
        expect(bad_result_01.errors[3].fieldName).eqls("gender")
    })



    // ============ success case ============ //

    const good_input_01 = {
        name: "Bob",
        email: "bob@gmail.com",
        favorites: ["Rocky 1", "Rocky 2", "Rocky 3", "Rocky 4", "Rocky 5"],
        gender: "MALE"
    }

    const good_result_01 = cast(User, good_input_01);

    expect(good_result_01.errors).to.be.undefined

    expect(good_result_01.value).to.have.keys([
        "username",
        "email",
        "favorites",
        "gender",
        "notificationOn"
    ])
    expect(good_result_01.value).to.be.a.instanceOf(User)

    expect(good_result_01.value.username)
        .to.be.of.a('string').eqls(good_input_01.name)
    expect(good_result_01.value.email)
        .to.be.of.a('string').eqls(good_input_01.email)
    expect(good_result_01.value.notificationOn)
        .to.be.of.a('boolean').eqls(false)
    expect(good_result_01.value.favorites)
        .to.be.of.an('array').eqls(good_input_01.favorites)
    expect(good_result_01.value.gender)
        .to.be.of.a('string').eqls(good_input_01.gender.toLowerCase())



})