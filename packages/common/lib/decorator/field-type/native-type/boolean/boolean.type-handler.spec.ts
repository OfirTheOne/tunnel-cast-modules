import { FieldHandler } from "@tunnel-cast/core";
import { BooleanHandler } from "./boolean.type-handler";

class ParentModel {}

describe("BooleanHandler", () => {
    let handler: FieldHandler;

    beforeEach(() => {
        handler = new BooleanHandler({}, "castKey", {}, ParentModel);
    });

    it("should contain the current typeName value.", () => {
        expect(handler.typeName).toEqual("boolean");
    });

    it("nativeValidations should defined", () => {
        expect(handler.nativeValidations).toBeDefined;
    });

    it("should contain the current typeName value.", () => {
        const handler = new BooleanHandler({ someKey: "someValue" }, "someKey", {}, ParentModel);
        expect(handler.typeName).toEqual("boolean");
    });

    it("should validate value type, using typeCondition.", () => {
        const booleanHandler = new BooleanHandler({}, "castKey", {}, ParentModel);
        const stagedHandler = {
            parsedValue: undefined as any,
            typeCondition: booleanHandler.typeCondition,
        };

        stagedHandler.parsedValue = false;
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.parsedValue = true;
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.parsedValue = 20;
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.parsedValue = undefined;
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.parsedValue = "false";
        expect(stagedHandler.typeCondition()).toBeFalsy();
    });
});
