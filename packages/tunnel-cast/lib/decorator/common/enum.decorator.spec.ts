import { IsEnum, isEnumMessageBuilder, isEnum } from "./enum.decorator";


describe("IsEnum", () => {

    enum ExampleEnum {
        A="A", 
        B="B"
    }

    it("should run isEnum constraint with enum object and pass", () => {
        
        const enumOrList = ExampleEnum;
        const fieldName = "testField";
        const fieldValue = "A";
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = isEnum({ 
            args: { enumOrList },
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("should run isEnum constraint with enum object and fail", () => {
        
        const enumOrList = ExampleEnum;
        const fieldName = "testField";
        const fieldValue = "no";
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = isEnum({ 
            args: { enumOrList },
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })

    it("should run isEnum constraint with enum value list and pass", () => {

        const enumOrList = ["A", "B"];
        const fieldName = "testField";
        const fieldValue = "A";
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = isEnum({ 
            args: { enumOrList },
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeTruthy();
    })

    it("should run isEnum constraint with enum value list and fail", () => {

        const enumOrList = ["A", "B"];
        const fieldName = "testField";
        const fieldValue = "no";
        const context = {
            [fieldName]: fieldValue
        };

        const constraintResult = isEnum({ 
            args: { enumOrList },
            fieldValue,
            fieldName,
            path: fieldName,
            context, 
            options: {} 
        });

        expect(constraintResult).toBeFalsy();
    })
})