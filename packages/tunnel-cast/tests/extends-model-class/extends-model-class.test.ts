import { expect } from 'chai';

import { field } from '../../lib/core/decorator';
import { cast } from '../../lib/core/cast';



describe("Feature : extends-model-class", function() {
    class _SuperClass {
        @field.String()
        name: string;

        @field.Number({ min: 20 })
        age: number;

        @field.String({ enums: ['Admin', 'Standard']})
        role: string
    }

    class _SubClass extends _SuperClass {
        @field.Array({ ofType: 'string' })
        favoriteMovies: Array<string>
    }

    it("Test case 01", function() {
        
        
        // ============ error case ============ //

        const bad_input_01 = {
            name: 50,
            age: 30,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"]
        } 

        const bad_input_02 = {
            name: 50,
            age: 10,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"]
        } 

        const bad_input_03 = {
            name: "Bob",
            age: 10,
            role: "Standard",
            favoriteMovies: "A"
        } 

        const bad_result_01 = cast(_SubClass, bad_input_01);
        expect(bad_result_01.errors).to.be.a('array').of.length(1)

        const bad_result_02 = cast(_SubClass, bad_input_02);
        expect(bad_result_02.errors).to.be.a('array').of.length(2)

        const bad_result_03 = cast(_SubClass, bad_input_03);
        expect(bad_result_03.errors).to.be.a('array').of.length(2)



        // ============ success case ============ //

        const good_input_01 = {
            name: "Bob",
            age:30,
            role: "Standard",
            favoriteMovies: ["A", "B", "C"]
        } 

        const good_result_01 = cast(_SubClass, good_input_01);
        expect(good_result_01.errors).to.be.undefined
        expect(good_result_01.value).to.be.a.instanceOf(_SubClass)
        expect(good_result_01.value).to.be.of.a('object').eql(good_input_01)

    })

   
})