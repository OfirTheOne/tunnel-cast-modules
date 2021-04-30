import { startsWith } from "./starts-with.decorator";

describe("[constraint fn] startsWith", () => {
    it("startsWith return true for empty array as field-value and empty array as argument.", () => {
        const fieldName = "testField";
        const fieldValue = [];
        const args = { value: [] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("startsWith return false for empty array as field-value and non empty array as argument.", () => {
        const fieldName = "testField";
        const fieldValue = [];
        const args = { value: [1, 2] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("startsWith return true for non empty array as field-value and actual suffix array even length as argument.", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d"];
        const args = { value: ["a", "b"] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("startsWith return false for non empty array as field-value and bad suffix array even length as argument.", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d"];
        const args = { value: ["a", "q"] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("startsWith return true for actual suffix array odd length", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d", "e"];
        const args = { value: ["a", "b", "c"] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("startsWith return false for non empty array as field-value and bad suffix array odd length as argument.", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d", "e"];
        const args = { value: ["a", "r", "c"] };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("startsWith return true for actual last item in the array", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d", "e"];
        const args = { value: "a" };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("startsWith return false for non empty array as field-value and bad last item in the array as argument.", () => {
        const fieldName = "testField";
        const fieldValue = ["a", "b", "c", "d", "e"];
        const args = { value: "p" };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("startsWith return true for non empty string as field-value and actual suffix string as argument", () => {
        const fieldName = "testField";
        const fieldValue = "abcde";
        const args = { value: "ab" };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("startsWith return false for non empty string as field-value and bad suffix string as argument", () => {
        const fieldName = "testField";
        const fieldValue = "abcde";
        const args = { value: "dq" };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = startsWith({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });
});
