import { expect } from 'chai';

import { field } from '../../../lib/core/decorator';
import { cast } from '../../../lib/core/cast';



describe("@field.Number", function() {
    class _TestClass01 {
        @field.Number()
        someNumber: number;
    }

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello"
        } 

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1)


        // ============ success case ============ //

        const good_input_01 = {
            someNumber: 50
        } 

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).to.be.undefined
        expect(good_result_01.value).to.have.key('someNumber')
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass01)
        expect(good_result_01.value.someNumber).to.be.of.a('number').eqls(good_input_01.someNumber)

    })

    class _TestClass02 {
        @field.Number({
            min: 20,
            max: 55
        })
        someNumber: number;
    }

    it("Test case 02", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello"
        } 
        const bad_input_02 = {
            someNumber: 60
        } 
        const bad_input_03 = {
            someNumber: 12
        } 

        const bad_result_01 = cast(_TestClass02, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1);

        const bad_result_02 = cast(_TestClass02, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(1);

        const bad_result_03 = cast(_TestClass02, bad_input_03);
        expect(bad_result_03.errors).to.be.a('array').of.length(1);


        // ============ success case ============ //

        const good_input_01 = {
            someNumber: 50
        } 

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key('someNumber');
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass02)
        expect(good_result_01.value.someNumber).to.be.of.a('number').eqls(good_input_01.someNumber);

    })

    class _TestClass03 {
        @field.Number({
            required: false,
            max: 55
        })
        someNumber: number;
    }

    it("Test case 03", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someNumber: "hello"
        } 
        const bad_input_02 = {
            someNumber: 60
        } 

        const bad_result_01 = cast(_TestClass03, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1);

        const bad_result_02 = cast(_TestClass03, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(1);


        // ============ success case ============ //

        const good_input_01 = {
            someNumber: undefined
        } 
        const good_input_02 = {
            someNumber: 12
        } 

        const good_result_01 = cast(_TestClass03, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key('someNumber');
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass03)
        expect(good_result_01.value.someNumber).to.be.of.undefined.eqls(good_input_01.someNumber);


        const good_result_02 = cast(_TestClass03, good_input_02);
        expect(good_result_02.errors).to.be.undefined;
        expect(good_result_02.value).to.have.key('someNumber');
        expect(good_result_02.value).to.be.a.instanceOf(_TestClass03)
        expect(good_result_02.value.someNumber).to.be.of.a('number').eqls(good_input_02.someNumber);

    })
})