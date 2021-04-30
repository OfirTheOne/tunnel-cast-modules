import { isEquals } from "./is-equals.decorator";

describe("[constraint fn] isEquals", () => {
    it("constraint return true for clone object equality using strict true.", () => {
        const fieldName = "testField";
        const fieldValue = { a: "A", b: "B", c: 123 };
        const args = {
            value: { ...fieldValue },
            strict: true,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("constraint return false for clone object equality using strict false.", () => {
        const fieldName = "testField";
        const fieldValue = { a: "A", b: "B", c: 123 };
        const args = {
            value: { ...fieldValue },
            strict: false,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("constraint return false for clone array equality using strict false.", () => {
        const fieldName = "testField";
        const fieldValue = ["A", "B", 123];
        const args = {
            value: [...fieldValue],
            strict: false,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("constraint return true for clone array equality using strict true.", () => {
        const fieldName = "testField";
        const fieldValue = ["A", "B", 123];
        const args = {
            value: [...fieldValue],
            strict: true,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("constraint return false for clone string equality using strict true.", () => {
        const fieldName = "testField";
        const fieldValue = "A";
        const args = {
            value: new String(fieldValue),
            strict: true,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("constraint return true for clone string equality using strict false.", () => {
        const fieldName = "testField";
        const fieldValue = "A";
        const args = {
            value: new String(fieldValue),
            strict: false,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });

    it("constraint return false for clone number equality using strict true.", () => {
        const fieldName = "testField";
        const fieldValue = 12;
        const args = {
            value: new Number(fieldValue),
            strict: true,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeFalsy();
    });

    it("constraint return true for clone number equality using strict false.", () => {
        const fieldName = "testField";
        const fieldValue = 12;
        const args = {
            value: new Number(fieldValue),
            strict: false,
        };
        const context = {
            [fieldName]: fieldValue,
        };

        const constraintResult = isEquals({
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context,
            options: {},
        });

        expect(constraintResult).toBeTruthy();
    });
});
