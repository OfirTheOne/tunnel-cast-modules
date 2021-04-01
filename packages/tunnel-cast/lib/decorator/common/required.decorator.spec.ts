import { required } from "./required.decorator";



describe("[constraint fn] required", () => {

    it("constraint return true for empty object.", () => {
        const fieldName = "testField";
        const fieldValue = { };
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("constraint return true for the number zero.", () => {
        const fieldName = "testField";
        const fieldValue = 0;
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("constraint return false for undefined.", () => {
        const fieldName = "testField";
        const fieldValue = undefined;
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

    it("constraint return false for null.", () => {
        const fieldName = "testField";
        const fieldValue = null;
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

    it("constraint return false for empty string.", () => {
        const fieldName = "testField";
        const fieldValue = '';
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

    it("constraint return true for non empty string.", () => {
        const fieldName = "testField";
        const fieldValue = 'hello';
        const args = {};
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = required({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

})