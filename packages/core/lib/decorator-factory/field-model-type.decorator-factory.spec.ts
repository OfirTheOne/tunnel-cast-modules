const mockTypeRegistry = {
    getInstance: jest.fn(),
};
jest.mock("../type-registry/type-registry", () => {
    return { TypeRegistry: mockTypeRegistry };
});

import { FieldModelTypeDecoratorFactory } from "./field-model-type.decorator-factory";
import { extractModelFieldsMap } from "../utils/model-metadata/extract-metadata";
import { ModelMetadataRepoNotFoundError } from "../errors";
import { assignModelFieldsMapIfNotExist } from "../utils/model-metadata/embed-metadata";
import { FieldsMapWrapper } from "../utils/fields-map-wrapper";

describe("FieldModelTypeDecoratorFactory", () => {
    class ExampleModel {
        name: string;
        username: string;
    }

    beforeAll(() => {
        assignModelFieldsMapIfNotExist(ExampleModel.prototype, new FieldsMapWrapper()); // add metadata repository
    });

    afterEach(() => {
        mockTypeRegistry.getInstance.mockClear();
    });
    it("should set field's metadata and provided model type using the factory decorator, using FieldModelTypeDecoratorFactory.", () => {
        const typeHandlerId = ExampleModel.name;
        const processedOptions = { "testing-option": "testing-option" };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) };
        const typeRegistryContent = new Map([[typeHandlerId, { optionsProcessor }]]);

        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);

        const TypeModelDecorator = FieldModelTypeDecoratorFactory(typeHandlerId, undefined, ExampleModel);

        const fieldName = "someString";
        const expectedType = ExampleModel;

        class ExampleClass {
            @TypeModelDecorator
            [fieldName]: any;
        }

        const mapWrapper = extractModelFieldsMap(ExampleClass);
        const [fieldEmbeddedData] = mapWrapper.getField(fieldName, false);

        expect(mockTypeRegistry.getInstance).toBeCalledTimes(1);
        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toEqual(processedOptions);
        expect(fieldEmbeddedData.handlerArgs[0]).toEqual(expectedType);
    });

    it("should set field's metadata and inferred model type using the factory decorator, using FieldModelTypeDecoratorFactory.", () => {
        const typeHandlerId = ExampleModel.name;
        const processedOptions = { "testing-option": "testing-option" };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) };
        const typeRegistryContent = new Map([[typeHandlerId, { optionsProcessor }]]);
        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);

        const TypeModelDecorator = FieldModelTypeDecoratorFactory(typeHandlerId);

        const fieldName = "someString";
        const expectedType = ExampleModel;

        class ExampleClass {
            @TypeModelDecorator
            [fieldName]: ExampleModel;
        }

        const mapWrapper = extractModelFieldsMap(ExampleClass);
        const [fieldEmbeddedData] = mapWrapper.getField(fieldName, false);

        expect(mockTypeRegistry.getInstance).toBeCalledTimes(1);
        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toEqual(processedOptions);
        expect(fieldEmbeddedData.handlerArgs[0]).toEqual(expectedType);
    });

    it("should throw an error by using non registered model, using FieldModelTypeDecoratorFactory.", () => {
        const fieldName = "fieldName";
        class NonRegisteredExampleModel {
            name: string;
            username: string;
        }

        const typeHandlerId = NonRegisteredExampleModel.name;
        const processedOptions = { "testing-option": "testing-option" };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) };
        const typeRegistryContent = new Map([[typeHandlerId, { optionsProcessor }]]);
        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);
        const decorator = FieldModelTypeDecoratorFactory(typeHandlerId, undefined, NonRegisteredExampleModel);
        expect(() => decorator(NonRegisteredExampleModel.prototype, fieldName)).toThrowError(
            ModelMetadataRepoNotFoundError,
        );
    });

    afterAll(() => {
        jest.unmock("../type-registry/type-registry");
    });
});
