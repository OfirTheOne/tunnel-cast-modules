
import { length } from "./length.decorator"

describe("[constraint fn] length", () => {

    it("constraint return true for valid len.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            len: 4
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("constraint return false for bad len.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            len: 8
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

    it("constraint return true valid min and max.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            min: 3,
            max: 5 
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy()
    })
    
    it("constraint return true valid min and max with the same value.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4, 5, 6];
        const args: any = { 
            min: 6,
            max: 6 
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy()
    })
    it("constraint return false bad min and max.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            min: 5,
            max: 6 
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy()
    })

    it("constraint return true for valid len, ignore min and max.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            min: 7,
            max: 9,
            len: 4
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("constraint return false for bad len, ignore min and max.", () => {
        const fieldName = "testField";
        const fieldValue = [1, 2, 3, 4];
        const args: any = { 
            min: 3,
            max: 5,
            len: 2
        };
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = length({ 
            args,
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

})