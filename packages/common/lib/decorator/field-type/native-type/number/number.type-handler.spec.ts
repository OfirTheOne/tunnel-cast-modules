import { FieldHandler } from "@tunnel-cast/core";
import { NumberHandler } from "./number.type-handler";

class ParentModel {}

describe("NumberHandler", () => {
    let handler: FieldHandler;

    beforeEach(() => {
        handler = new NumberHandler({}, "castKey", {}, ParentModel);
    });

    it("should contain the current typeName value.", () => {
        expect(handler.typeName).toEqual("number");
    });

    it("nativeValidations should defined", () => {
        expect(handler.nativeValidations).toBeDefined;
    });

    it("should validate value type, using typeCondition.", () => {
        const numberHandler = new NumberHandler({}, "castKey", {}, ParentModel);
        const stagedHandler = {
            parsedValue: undefined as any,
            typeCondition: numberHandler.typeCondition,
        };

        stagedHandler.parsedValue = 20;
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.parsedValue = "20";
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.parsedValue = "bar";
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.parsedValue = undefined;
        expect(stagedHandler.typeCondition()).toBeFalsy();
    });

    it("should validate target value correctly, using nativeValidations.maxLength", () => {
        const { max } = (handler as NumberHandler).nativeValidations;
        expect(max.condition(4, 2, {})).toBeFalsy();
        expect(max.condition(0, 0, {})).toBeFalsy();
        expect(max.condition(4, 5, {})).toBeTruthy();
        expect(max.condition(-3, 0, {})).toBeTruthy();
    });

    it("should validate target value correctly, using nativeValidations.minLength", () => {
        const { min } = (handler as NumberHandler).nativeValidations;
        expect(min.condition(4, 2, {})).toBeTruthy();
        expect(min.condition(0, 0, {})).toBeTruthy();
        expect(min.condition(4, 5, {})).toBeFalsy();
        expect(min.condition(-3, 0, {})).toBeFalsy();
    });
});
