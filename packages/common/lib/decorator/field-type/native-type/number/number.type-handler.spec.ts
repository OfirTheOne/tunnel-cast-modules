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
});
