import { FieldHandler } from "@tunnel-cast/core/field-handler";
import { ArrayHandler } from "./array.type-handler";

class ParentModel {}

describe("ArrayHandler", () => {
    let handler: FieldHandler;
    beforeEach(() => {
        handler = new ArrayHandler({}, "castKey", {}, ParentModel);
    });

    it("nativeValidations should defined", () => {
        expect(handler.nativeValidations).toBeDefined;
    });

    it("should contain the current typeName value.", () => {
        expect(handler.typeName).toEqual("array");
    });

    it("should validate value type, using typeCondition.", () => {
        const handler = new ArrayHandler({}, "castKey", {}, ParentModel);
        const stagedHandler = {
            originValue: undefined as any,
            typeCondition: handler.typeCondition,
        };

        stagedHandler.originValue = [];
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue = 20;
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.originValue = undefined;
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.originValue = "[]";
        expect(stagedHandler.typeCondition()).toBeFalsy();

        stagedHandler.originValue = "Bob";
        expect(stagedHandler.typeCondition()).toBeFalsy();
    });

    it("should validate target value correctly, using nativeValidations.maxLength", () => {
        const { maxLength } = (handler as ArrayHandler).nativeValidations;
        expect(maxLength.condition([1, 2, 3], 2, {})).toBeFalsy();
        expect(maxLength.condition([], 0, {})).toBeFalsy();
        expect(maxLength.condition([1, 2, 3], 3, {})).toBeFalsy();
        expect(maxLength.condition([1, 2, 3], 4, {})).toBeTruthy();
        expect(maxLength.condition([], 1, {})).toBeTruthy();
    });

    it("should validate target value correctly, using nativeValidations.minLength", () => {
        const { minLength } = (handler as ArrayHandler).nativeValidations;
        expect(minLength.condition([1, 2, 3], 2, {})).toBeTruthy();
        expect(minLength.condition([], 0, {})).toBeTruthy();
        expect(minLength.condition([1, 2, 3], 3, {})).toBeTruthy();
        expect(minLength.condition([1, 2, 3], 4, {})).toBeFalsy();
        expect(minLength.condition([], 1, {})).toBeFalsy();
    });

    it("should validate target value correctly, using nativeValidations.ofType", () => {
        const { ofType } = (handler as ArrayHandler).nativeValidations;
        expect(ofType.condition([1, 2, 3], "number", {})).toBeTruthy();
        expect(ofType.condition([], "any", {})).toBeTruthy();
        expect(ofType.condition(["", "234", "hello"], "string", {})).toBeTruthy();
        expect(ofType.condition([1, "hello", 3], "number", {})).toBeFalsy();
        expect(ofType.condition([1, "213", 3], "number", {})).toBeFalsy();
        expect(ofType.condition([{}, 12, "hello"], "any", {})).toBeFalsy();
    });

    it("should validate target value correctly, using nativeValidations.allowType", () => {
        const { allowType } = (handler as ArrayHandler).nativeValidations;
        expect(allowType.condition([], [], {})).toBeTruthy();
        expect(allowType.condition([], ["number"], {})).toBeTruthy();
        expect(allowType.condition([1, 2], [], {})).toBeTruthy();
        expect(allowType.condition([1, "hello", 3], ["string", "number"], {})).toBeTruthy();
        expect(allowType.condition([1, "hello", 3], ["string", "number", "boolean"], {})).toBeTruthy();
        expect(allowType.condition(["", "234", "hello"], ["string"], {})).toBeTruthy();
        expect(allowType.condition([{}, new Date()], ["object"], {})).toBeTruthy();
        expect(allowType.condition([1, "213", 3], ["number"], {})).toBeFalsy();
        expect(allowType.condition([{}, 12, "hello"], ["any"], {})).toBeFalsy();
    });
});
