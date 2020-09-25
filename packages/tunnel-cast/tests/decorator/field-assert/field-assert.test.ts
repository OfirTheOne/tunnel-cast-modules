import { expect } from 'chai';

import * as field from '../../../lib/common';
import { AssertType } from '../../../lib/common';
import { cast } from '../../../lib/common/cast';



describe("Feature : @Assert", function() {
    class _TestClass01 {
        @AssertType('number')
        @field.String({
            parsing: [String]
        })
        someString: string;
    }

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello"
        } 

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1)


        // ============ success case ============ //

        const good_input_01 = {
            someString: 1500
        } 

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).to.be.undefined
        expect(good_result_01.value).to.have.key('someString')
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass01)
        expect(good_result_01.value.someString).to.be.of.a('string').eqls(String(good_input_01.someString))

    })

    class _TestClass02 {
        @AssertType([])
        @field.String({
            parsing: [(value) => value.map(String).join(' ')]
        })
        someString: string;
    }

    it("Test case 02", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello"
        } 

        const bad_result_01 = cast(_TestClass02, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1);


        // ============ success case ============ //

        const good_input_01 = {
            someString: ["hello", "from", "area", 51]
        } 

        const good_result_01 = cast(_TestClass02, good_input_01);
        expect(good_result_01.errors).to.be.undefined;
        expect(good_result_01.value).to.have.key('someString');
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass02)
        expect(good_result_01.value.someString).to.be.of.a('string').eqls("hello from area 51");

        
        const good_input_02 = {
            someString: []
        } 

        const good_result_02 = cast(_TestClass02, good_input_02);
        expect(good_result_02.errors).to.be.undefined;
        expect(good_result_02.value).to.have.key('someString');
        expect(good_result_02.value).to.be.a.instanceOf(_TestClass02)
        expect(good_result_02.value.someString).to.be.of.a('string').eqls('');

    })

})