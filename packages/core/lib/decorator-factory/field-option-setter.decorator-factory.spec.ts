import { FieldOptionSetterDecoratorFactory } from "./field-option-setter.decorator-factory";
import { extractRootRepo } from "../utils/model-metadata/extract-metadata";
import { assignRootRepo } from "../utils/model-metadata/embed-metadata";
import { ModelMetadataRepoNotFoundError } from "../errors";

describe("FieldOptionSetterDecoratorFactory", () => {
    beforeAll(() => {});

    afterEach(() => {});
    it("should set field's option value in class prototype using the factory decorator, using FieldOptionSetterDecoratorFactory.", () => {
        const keyName = "nullable";
        const keyValue = false;
        const FieldOptionDecorator = FieldOptionSetterDecoratorFactory(keyName, keyValue);

        const fieldName = "someString";

        class ExampleClass {
            [fieldName]: any;
        }
        assignRootRepo(ExampleClass.prototype, new Map()); // add metadata repository
        FieldOptionDecorator(ExampleClass.prototype, fieldName);

        const rootRepo = extractRootRepo(ExampleClass);
        const [fieldEmbeddedData] = rootRepo.get(fieldName);

        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toBeDefined();
        expect(fieldEmbeddedData.options[keyName]).toEqual(keyValue);
    });

    it("should throw an error by using non registered model, using FieldOptionSetterDecoratorFactory.", () => {
        const keyName = "nullable";
        const keyValue = false;
        const FieldOptionDecorator = FieldOptionSetterDecoratorFactory(keyName, keyValue);

        const fieldName = "someString";

        expect(() => {
            class ExampleClass {
                @FieldOptionDecorator
                [fieldName]: any;
            }
        }).toThrowError(ModelMetadataRepoNotFoundError);
    });

    afterAll(() => {});
});
