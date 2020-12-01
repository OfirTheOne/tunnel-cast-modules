import { expect } from "chai";

import * as fieldType from "../../../../lib/decorator/field-type";
import { AssertType, Parsing } from "../../../../lib";
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
        expect(bad_result_01.errors).to.be.a("array").of.length(1);

        // ============ success case ============ //

        const good_input_01 = {
            someBoolean: true,
        };

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key("someBoolean");
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass01);
        expect(good_result_01.value.someBoolean).to.be.of.a("boolean").eqls(good_input_01.someBoolean);
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
        expect(bad_result_01.errors).to.be.a("array").of.length(1);

        // ============ success case ============ //

        const good_input_01 = {
            someBoolean: true,
        };

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key("someBoolean");
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass02);
        expect(good_result_01.value.someBoolean).to.be.of.a("boolean").eqls(good_input_01.someBoolean);

        const good_input_02 = {
            someBoolean: undefined,
        };

        const good_result_02 = cast(_TestClass02, good_input_02);
        expect(good_result_02.errors).to.be.undefined;
        expect(good_result_02.value).to.have.key("someBoolean");
        expect(good_result_02.value).to.be.a.instanceOf(_TestClass02);
        expect(good_result_02.value.someBoolean).to.be.of.a("boolean").eqls(false);
    });
});
