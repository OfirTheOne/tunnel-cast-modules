

const mockTypeRegistry = {
    getInstance: jest.fn()
};
jest.mock('../type-registry/type-registry', () => {
    return { TypeRegistry: mockTypeRegistry }
})

import { FieldModelTypeDecoratorFactory } from './field-model-type.decorator-factory';
import { extractRootRepo } from '../../internal/model-metadata/extract-metadata';
import { assignRootRepo } from '../../internal/model-metadata/embed-metadata';
import { ModelMetadataRepoNotFoundError } from '../../../error';

describe('FieldModelTypeDecoratorFactory', () => {
    class ExampleModel {
        name: string;
        username: string;   
    }

    beforeAll(() => {        
        assignRootRepo(ExampleModel.prototype, new Map()); // add metadata repository
    })

    afterEach(() => {
        mockTypeRegistry.getInstance.mockClear()
    })
    it('should set field\'s metadata and provided model type using the factory decorator, using FieldModelTypeDecoratorFactory.', () => {

        const typeHandlerId = ExampleModel.name;
        const processedOptions = { 'testing-option': 'testing-option' };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) }
        const typeRegistryContent = new Map([
            [ typeHandlerId, { optionsProcessor } ]
        ])

        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);

        const TypeModelDecorator = FieldModelTypeDecoratorFactory(typeHandlerId, undefined, ExampleModel);
        
        const fieldName = 'someString';
        const expectedType = ExampleModel

        class ExampleClass {
            @TypeModelDecorator
            [fieldName]: any;
        }

        const rootRepo = extractRootRepo(ExampleClass);
        const [fieldEmbeddedData] = rootRepo.get(fieldName);

        expect(mockTypeRegistry.getInstance).toBeCalledTimes(1)
        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toEqual(processedOptions);
        expect(fieldEmbeddedData.handlerArgs[0]).toEqual(expectedType);
        
    })

    it('should set field\'s metadata and inferred model type using the factory decorator, using FieldModelTypeDecoratorFactory.', () => {

        const typeHandlerId = ExampleModel.name;
        const processedOptions = { 'testing-option': 'testing-option' };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) };
        const typeRegistryContent = new Map([
            [ typeHandlerId, { optionsProcessor } ]
        ]);
        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);

        const TypeModelDecorator = FieldModelTypeDecoratorFactory(typeHandlerId);
        
        const fieldName = 'someString';
        const expectedType = ExampleModel

        class ExampleClass {
            @TypeModelDecorator
            [fieldName]: ExampleModel;
        }

        const rootRepo = extractRootRepo(ExampleClass);
        const [fieldEmbeddedData] = rootRepo.get(fieldName);

        expect(mockTypeRegistry.getInstance).toBeCalledTimes(1)
        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toEqual(processedOptions);
        expect(fieldEmbeddedData.handlerArgs[0]).toEqual(expectedType);
        
    })
    
    it('should throw an error by using non registered model, using FieldModelTypeDecoratorFactory.', () => {

        const fieldName = 'fieldName'
        class NonRegisteredExampleModel {
            name: string;
            username: string;   
        }

        const typeHandlerId = NonRegisteredExampleModel.name;
        const processedOptions = { 'testing-option': 'testing-option' };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) }
        const typeRegistryContent = new Map([
            [ typeHandlerId, { optionsProcessor } ]
        ])
        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);
        const decorator =  FieldModelTypeDecoratorFactory(typeHandlerId, undefined, NonRegisteredExampleModel)
        expect( () => decorator(NonRegisteredExampleModel.prototype, fieldName) ).toThrowError(ModelMetadataRepoNotFoundError) ;
        
    })

    afterAll(() => {
        jest.unmock('../type-registry/type-registry');
    })
})
