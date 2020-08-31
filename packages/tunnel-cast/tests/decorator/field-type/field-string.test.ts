import { expect } from 'chai';

import { field } from '../../../lib/core/decorator';
import { cast } from '../../../lib/core/cast';



describe("@field.String", function() {
    class _TestClass01 {
        @field.String()
        someString: string;
    }

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            someString: []
        } 

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1)


        // ============ success case ============ //

        const good_input_01 = {
            someString: "hello"
        } 

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).to.be.undefined
        expect(good_result_01.value).to.have.key('someString')
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass01)
        expect(good_result_01.value.someString).to.be.of.a('string').eqls(good_input_01.someString)

    })

    class _TestClass02 {
        @field.String({
            required: true,
            format: /^.+(cast)$/
        })
        someString: string;
    }

    it("Test case 02", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someString: 40
        } 
        const bad_input_02 = {
            someString: "tunnel-cas___t"
        } 
        const bad_input_03 = {
            someString: undefined
        } 

        const bad_result_01 = cast(_TestClass02, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1);

        const bad_result_02 = cast(_TestClass02, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(1);

        const bad_result_03 = cast(_TestClass02, bad_input_03);
        expect(bad_result_03.errors).to.be.a('array').of.length(1);


        // ============ success case ============ //

        const good_input_01 = {
            someString: "tunnel-cast"
        } 

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key('someString');
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass02)
        expect(good_result_01.value.someString).to.be.of.a('String').eqls(good_input_01.someString);

    })

    class _TestClass03 {
        @field.String({
            required: false,
            enums: ["tunnel", "cast", "tunnel-cast"]
        })
        someString: String;
    }

    it("Test case 03", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello"
        } 
        const bad_input_02 = {
            someString: 60
        } 

        const bad_result_01 = cast(_TestClass03, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1);

        const bad_result_02 = cast(_TestClass03, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(1);


        // ============ success case ============ //

        const good_input_01 = {
            someString: undefined
        } 
        const good_input_02 = {
            someString: "tunnel"
        } 

        const good_result_01 = cast(_TestClass03, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key('someString');
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass03)
        expect(good_result_01.value.someString).to.be.of.undefined.eqls(good_input_01.someString);


        const good_result_02 = cast(_TestClass03, good_input_02);
        expect(good_result_02.errors).to.be.undefined;
        expect(good_result_02.value).to.have.key('someString');
        expect(good_result_02.value).to.be.a.instanceOf(_TestClass03)
        expect(good_result_02.value.someString).to.be.of.a('string').eqls(good_input_02.someString);

    })
})