import { FieldHandler } from "@tunnel-cast/core";
import { StringHandler } from "./string.type-handler";

class ParentModel {}

describe("StringHandler", () => {
    let handler: FieldHandler;

    beforeEach(() => {
        handler = new StringHandler({}, "castKey", {}, ParentModel);
    });

    it("should contain the current typeName value.", () => {
        expect(handler.typeName).toEqual("string");
    });

    it("nativeValidations should defined", () => {
        expect(handler.nativeValidations).toBeDefined;
    });

    it("should validate value type, using typeCondition.", () => {
        const stringHandler = new StringHandler({}, "castKey", {}, ParentModel);
        const stagedHandler = {
            parsedValue: undefined as any,
            typeCondition: stringHandler.typeCondition,
        };

        stagedHandler.parsedValue = "bar";
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.parsedValue = 20;
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.parsedValue = undefined;
        expect(stagedHandler.typeCondition()).toBeFalsy();
    });

    it.todo("should validate target value correctly, using nativeValidations.<CONDITION>");
});
