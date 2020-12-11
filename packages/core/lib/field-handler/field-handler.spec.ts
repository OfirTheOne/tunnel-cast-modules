import { FieldHandler } from "./index";

import { BaseFieldOptions } from "../interfaces/field-options";
import { NativeValidationDict } from "../interfaces/native-validation-dict";
import { Class } from "../utils/type-helpers";
import { ErrorCode } from "../enums/error-code.enum";

const fieldHandlerSpies = {
    extractValue: undefined as jest.SpyInstance<any, unknown[]>,
    evaluateOriginValueExistent: undefined as jest.SpyInstance<any, unknown[]>,
    applyAssertion: undefined as jest.SpyInstance<any, unknown[]>,
    applyNativeValidation: undefined as jest.SpyInstance<any, unknown[]>,
    runParsing: undefined as jest.SpyInstance<any, unknown[]>,
    runValidations: undefined as jest.SpyInstance<any, unknown[]>,
    runTransformations: undefined as jest.SpyInstance<any, unknown[]>,
    typeCondition: undefined as jest.SpyInstance<any, unknown[]>,
};
class TestFieldHandler extends FieldHandler {
    public nativeValidations: NativeValidationDict<BaseFieldOptions> = {};
    public typeName: string = "example-type";

    constructor(
        context: any,
        fieldName: string,
        projectedContext: any,
        parentModelRef: Class<any>,
        options?: BaseFieldOptions,
    ) {
        super(context, fieldName, projectedContext, parentModelRef, options);

        fieldHandlerSpies["extractValue"] = jest.spyOn(this as any, "extractValue");
        fieldHandlerSpies["evaluateOriginValueExistent"] = jest.spyOn(this as any, "evaluateOriginValueExistent");
        fieldHandlerSpies["applyAssertion"] = jest.spyOn(this as any, "applyAssertion");
        fieldHandlerSpies["applyNativeValidation"] = jest.spyOn(this as any, "applyNativeValidation");
        fieldHandlerSpies["runParsing"] = jest.spyOn(this as any, "runParsing");
        fieldHandlerSpies["runValidations"] = jest.spyOn(this as any, "runValidations");
        fieldHandlerSpies["runTransformations"] = jest.spyOn(this as any, "runTransformations");
        fieldHandlerSpies["typeCondition"] = jest.spyOn(this as any, "typeCondition");
    }

    public typeCondition(): boolean {
        return true;
    }
}

class ParentModel {}

describe("FieldHandler", () => {
    let handler: FieldHandler;

    beforeEach(() => {
        handler = new TestFieldHandler({}, "castKey", {}, ParentModel);
        Object.values(fieldHandlerSpies).forEach((spy) => spy.mockReset());
    });

    it("should contain the current typeName value.", () => {
        expect(handler.typeName).toEqual("example-type");
    });

    it("nativeValidations should defined", () => {
        expect(handler.nativeValidations).toBeDefined;
    });

    it("should run FieldHandler.handle with required true and existing value as expected.", () => {
        const validateField = "castKey";
        const validateValue = 2500;
        const targetObject = { [validateField]: validateValue };
        const castOptions: BaseFieldOptions = {
            required: true,
            validations: [(val) => val > 2000],
        };
        const fieldHandler = new TestFieldHandler(targetObject, validateField, {}, ParentModel, castOptions);

        const result = fieldHandler.handle(undefined);

        expect(result.fieldName).toEqual(validateField);
        expect(result["context"]).toEqual(targetObject);
        expect(result["projectedContext"]).toEqual({ [validateField]: validateValue });
        expect(result["errors"]).toEqual(undefined);

        expect(fieldHandlerSpies.extractValue).toBeCalledTimes(1);
        expect(fieldHandlerSpies.extractValue).toReturnWith(validateValue);

        expect(fieldHandlerSpies.evaluateOriginValueExistent).toBeCalledTimes(1);
        expect(fieldHandlerSpies.evaluateOriginValueExistent).toReturnWith(true);

        expect(fieldHandlerSpies.applyAssertion).toBeCalledTimes(1);
        expect(fieldHandlerSpies.applyAssertion).toReturnWith(true);

        expect(fieldHandlerSpies.runParsing).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runParsing.mock.calls[0][0]).toEqual([]);
        expect(fieldHandlerSpies.runParsing).toReturnWith(validateValue);

        expect(fieldHandlerSpies.applyNativeValidation).toBeCalledTimes(1);
        expect(fieldHandlerSpies.applyNativeValidation).toReturnWith(true);

        expect(fieldHandlerSpies.runValidations).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runValidations.mock.calls[0][0]).toEqual(castOptions.validations);
        expect(fieldHandlerSpies.runValidations).toReturnWith(true);

        expect(fieldHandlerSpies.runTransformations).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runTransformations.mock.calls[0][0]).toEqual([]);
        expect(fieldHandlerSpies.runTransformations).toReturnWith(validateValue);
    });

    it("should run FieldHandler.handle with required true and not-existing value as expected.", () => {
        const validateField = "castKey";
        const validateValue = undefined;
        const targetObject = { [validateField]: validateValue };
        const castOptions: BaseFieldOptions = {
            required: true,
            validations: [(val) => val > 2000],
        };
        const fieldHandler = new TestFieldHandler(targetObject, validateField, {}, ParentModel, castOptions);

        const result = fieldHandler.handle(undefined);

        expect(result.fieldName).toEqual(validateField);
        expect(result["errors"]).toBeDefined();
        expect(result["errors"].length).toEqual(1);
        expect(result["errors"][0]["code"]).toEqual(ErrorCode.FieldRequiredError);

        expect(fieldHandlerSpies.extractValue).toBeCalledTimes(1);
        expect(fieldHandlerSpies.extractValue).toReturnWith(validateValue);

        expect(fieldHandlerSpies.evaluateOriginValueExistent).toBeCalledTimes(1);
        expect(fieldHandlerSpies.evaluateOriginValueExistent).toReturnWith(false);

        expect(fieldHandlerSpies.applyAssertion).toBeCalledTimes(0);

        expect(fieldHandlerSpies.runParsing).toBeCalledTimes(0);

        expect(fieldHandlerSpies.applyNativeValidation).toBeCalledTimes(0);

        expect(fieldHandlerSpies.runValidations).toBeCalledTimes(0);

        expect(fieldHandlerSpies.runTransformations).toBeCalledTimes(0);
    });

    it("should run FieldHandler.handle with 'attribute' set to an external map key, as expected.", () => {
        const validateField = "castKey";
        const attribute = "external-key";

        const validateValue = 2500;
        const targetObject = { [attribute]: validateValue };
        const castOptions: BaseFieldOptions = {
            required: true,
            attribute,
            validations: [(val) => val > 2000],
        };
        const fieldHandler = new TestFieldHandler(targetObject, validateField, {}, ParentModel, castOptions);

        const result = fieldHandler.handle(undefined);

        expect(result.fieldName).toEqual(validateField);
        expect(result["context"]).toEqual(targetObject);
        expect(result["projectedContext"]).toEqual({ [validateField]: validateValue });
        expect(result["errors"]).toEqual(undefined);

        expect(fieldHandlerSpies.extractValue).toBeCalledTimes(1);
        expect(fieldHandlerSpies.extractValue).toReturnWith(validateValue);

        expect(fieldHandlerSpies.evaluateOriginValueExistent).toBeCalledTimes(1);
        expect(fieldHandlerSpies.evaluateOriginValueExistent).toReturnWith(true);

        expect(fieldHandlerSpies.applyAssertion).toBeCalledTimes(1);
        expect(fieldHandlerSpies.applyAssertion).toReturnWith(true);

        expect(fieldHandlerSpies.runParsing).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runParsing.mock.calls[0][0]).toEqual([]);
        expect(fieldHandlerSpies.runParsing).toReturnWith(validateValue);

        expect(fieldHandlerSpies.applyNativeValidation).toBeCalledTimes(1);
        expect(fieldHandlerSpies.applyNativeValidation).toReturnWith(true);

        expect(fieldHandlerSpies.runValidations).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runValidations.mock.calls[0][0]).toEqual(castOptions.validations);
        expect(fieldHandlerSpies.runValidations).toReturnWith(true);

        expect(fieldHandlerSpies.runTransformations).toBeCalledTimes(1);
        expect(fieldHandlerSpies.runTransformations.mock.calls[0][0]).toEqual([]);
        expect(fieldHandlerSpies.runTransformations).toReturnWith(validateValue);
    });

    it.todo("should run FieldHandler.handle with 'attribute' with error");

    it.todo("should run FieldHandler.handle with 'fallbackAttribute' successfully");
    it.todo("should run FieldHandler.handle with 'fallbackAttribute' with error");

    it.todo("should run FieldHandler.handle with 'assert' successfully");
    it.todo("should run FieldHandler.handle with 'assert' with error");

    it.todo("should run FieldHandler.handle with 'attribute' successfully");
    it.todo("should run FieldHandler.handle with 'attribute' with error");

    it.todo("should run FieldHandler.handle with 'default' successfully");
    it.todo("should run FieldHandler.handle with 'default' with error");

    it.todo("should run FieldHandler.handle with 'parsing' successfully");
    it.todo("should run FieldHandler.handle with 'parsing' with error");

    it.todo("should run FieldHandler.handle with 'validations' successfully");
    it.todo("should run FieldHandler.handle with 'validations' with error");

    it.todo("should run FieldHandler.handle with 'transformations' successfully");
    it.todo("should run FieldHandler.handle with 'transformations' with error");
});
