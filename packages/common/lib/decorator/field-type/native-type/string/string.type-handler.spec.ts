test.todo('string.type-handler')


// import { FieldHandler } from '@tunnel-cast/core/field-handler';
import { StringHandler } from './string.type-handler';



class ParentModel {}

describe('StringHandler', () => {

    beforeEach(() => {

    })

    it('should contain the current typeName value.',() => {
        const handler = new StringHandler({ someKey: 'someValue' },'someKey',{}, ParentModel);
        expect(handler.typeName).toEqual('string')

    }) 
    
    it('should validate value type, using typeCondition.', () => {

        const stringHandler = new StringHandler({}, 'castKey', {}, ParentModel);
        const stagedHandler = {
            originValue: undefined as any, 
            typeCondition: stringHandler.typeCondition
        };

        stagedHandler.originValue = 'bar'
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue= 20
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= undefined
        expect(stagedHandler.typeCondition()).toBeFalsy()
    })

    it('', () => {

    })

    it('', () => {

    })

})