import { expect } from 'chai';

import { field } from '../../../lib/core/decorator';
import { cast } from '../../../lib/core/cast';



describe("Feature : @field.Model", function() {
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

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            person: {
                name: 20
            },
            description: "sone string"
        } 

        const bad_input_02 = {
            person: {
                name: "Bob",
                age:30
            },
            description: [undefined]
        } 

        const bad_input_03 = {
            person: {
                name: 30,
                age:30
            },
            description: [undefined]
        } 

        const bad_result_01 = cast(_TestClass01, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1)

        const bad_result_02 = cast(_TestClass01, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(1)

        const bad_result_03 = cast(_TestClass01, bad_input_03);
        expect(bad_result_03.errors).to.be.a('array').of.length(2)



        // ============ success case ============ //

        const good_input_01 = {
            person: {
                name: "Bob",
                age:30
            },
            description: "sone string"
        } 

        const good_result_01 = cast(_TestClass01, good_input_01);
        expect(good_result_01.errors).to.be.undefined
        expect(good_result_01.value).to.be.a.instanceOf(_TestClass01)
        expect(good_result_01.value).to.be.of.a('object').eql(good_input_01)

    })

   
})