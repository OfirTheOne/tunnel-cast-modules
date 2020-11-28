// import { expect } from 'chai';

import * as fieldType from '../../../../lib/common/decorator/field-type';
import { AssertType, Parsing } from '../../../../lib/common';
import { cast } from '../../../../lib/common/cast';



describe("@AssertType", function() {
    class TestClass01 {
        @AssertType('number')
        @Parsing(global.String)
        @fieldType.String()
        someString: string;
    }

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello"
        } 

        const bad_result_01 = cast(TestClass01, bad_input_01);
        expect(bad_result_01.errors).toBeDefined()
        expect(bad_result_01.errors.length).toEqual(1)


        // ============ success case ============ //

        const good_input_01 = {
            someString: 1500
        } 

        const good_result_01 = cast(TestClass01, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty('someString')
        expect(good_result_01.value).toBeInstanceOf(TestClass01)
        expect(good_result_01.value.someString).toEqual(String(good_input_01.someString))

    })

    class TestClass02 {
        @AssertType([])
        @Parsing(value => value.map(global.String).join(' '))
        @fieldType.String()
        someString: string;
    }

    it("Test case 02", function() {

        // ============ error case ============ //

        const bad_input_01 = {
            someString: "hello"
        } 

        const bad_result_01 = cast(TestClass02, bad_input_01);

        expect(bad_result_01.errors).toBeDefined()
        expect(bad_result_01.errors.length).toEqual(1)
        // ============ success case ============ //

        const good_input_01 = {
            someString: ["hello", "from", "area", 51]
        } 

        const good_result_01 = cast(TestClass02, good_input_01);
        expect(good_result_01.errors).toBeUndefined();
        expect(good_result_01.value).toHaveProperty('someString')
        expect(good_result_01.value).toBeInstanceOf(TestClass02)
        expect(good_result_01.value.someString).toEqual("hello from area 51");

        const good_input_02 = {
            someString: []
        } 

        const good_result_02 = cast(TestClass02, good_input_02);
        expect(good_result_02.errors).toBeUndefined();
        expect(good_result_02.value).toHaveProperty('someString');
        expect(good_result_02.value).toBeInstanceOf(TestClass02)
        expect(good_result_02.value.someString).toEqual('');

    })

})