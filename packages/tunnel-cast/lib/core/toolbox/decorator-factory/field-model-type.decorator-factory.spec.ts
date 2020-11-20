
 
const mockTypeRegistry = {
    getInstance: jest.fn()
};
jest.mock('../type-registry/type-registry', () => {
    return { TypeRegistry: mockTypeRegistry }
})

import { FieldModelTypeDecoratorFactory } from './field-model-type.decorator-factory';
import { extractRootRepo } from 'lib/core/internal/model-metadata/extract-metadata';

describe('FieldModelTypeDecoratorFactory', () => {
    
    it('should set field metadata using the created decorator, using FieldModelTypeDecoratorFactory.', () => {
    

        const typeHandlerId = 'exampleTypeHandlerId';
        const processedOptions = { 'testing-option': 'testing-option' };
        const optionsProcessor = { process: jest.fn().mockReturnValue(processedOptions) }
        const typeRegistryContent = new Map([
            [ typeHandlerId, { optionsProcessor } ]
        ])

        mockTypeRegistry.getInstance.mockReturnValue(typeRegistryContent);

        const TypeDecorator = FieldModelTypeDecoratorFactory(typeHandlerId, undefined);
        
        const fieldName = 'someString';
        const expectedType = 'string'

        class ExampleClass {
            @TypeDecorator
            [fieldName]: string;
        }

        const rootRepo = extractRootRepo(ExampleClass);
        const [fieldEmbeddedData] = rootRepo.get(fieldName);

        expect(fieldEmbeddedData.fieldKey).toEqual(fieldName);
        expect(fieldEmbeddedData.options).toEqual(processedOptions);
        expect(fieldEmbeddedData.handlerArgs[0]).toEqual(expectedType);
        
    })


    it('should', () => {

    })
})
