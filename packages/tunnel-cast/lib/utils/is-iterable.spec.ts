import { isIterable } from "./is-iterable";

describe("isIterable", () => {
    it("isIterable detect arrays", () => {
        const exampleArray01 = [1, 2];
        const exampleArray02 = [];

        expect(isIterable(exampleArray01)).toBeTruthy();
        expect(isIterable(exampleArray02)).toBeTruthy();
    });

    it("isIterable detect strings", () => {
        const exampleString01 = "abcd";
        const exampleString02 = "";

        expect(isIterable(exampleString01)).toBeTruthy();
        expect(isIterable(exampleString02)).toBeTruthy();
    });

    it("isIterable detect non iterable values", () => {
        const exampleNumber = 123;
        const exampleNaN = NaN;
        const exampleNull = null;
        const exampleUndefined = undefined;
        const exampleObject01 = { a: 1, b: 2 };
        const exampleObject02 = {};

        expect(isIterable(exampleNumber)).toBeFalsy();
        expect(isIterable(exampleNaN)).toBeFalsy();
        expect(isIterable(exampleNull)).toBeFalsy();
        expect(isIterable(exampleUndefined)).toBeFalsy();
        expect(isIterable(exampleObject01)).toBeFalsy();
        expect(isIterable(exampleObject02)).toBeFalsy();
    });
});
