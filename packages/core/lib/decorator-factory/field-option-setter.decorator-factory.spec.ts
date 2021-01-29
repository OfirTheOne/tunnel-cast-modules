import { FieldOptionSetterDecoratorFactory } from "./field-option-setter.decorator-factory";
import { extractModelFieldsMap } from "../utils/model-metadata/extract-metadata";
import { assignModelFieldsMapIfNotExist } from "../utils/model-metadata/embed-metadata";
import { ModelMetadataRepoNotFoundError } from "../errors";
import { FieldsMapWrapper } from "../utils/fields-map-wrapper";

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
        assignModelFieldsMapIfNotExist(ExampleClass.prototype, new FieldsMapWrapper()); // add metadata repository
        FieldOptionDecorator(ExampleClass.prototype, fieldName);

        const mapWrapper = extractModelFieldsMap(ExampleClass);
        const [fieldEmbeddedData] = mapWrapper.getField(fieldName, false);

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
