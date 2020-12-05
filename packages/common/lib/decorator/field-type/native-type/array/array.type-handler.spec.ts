test.todo('array.type-handler')


// import { FieldHandler } from '@tunnel-cast/core/field-handler';
import { ArrayHandler } from './array.type-handler';



class ParentModel {}

describe('ArrayHandler', () => {

    beforeEach(() => {

    })

    it('should contain the current typeName value.',() => {
        const handler = new ArrayHandler({ someKey: 'someValue' },'someKey',{}, ParentModel);
        expect(handler.typeName).toEqual('array')

    }) 
    
    it('should validate value type, using typeCondition.', () => {

        const arrayHandler = new ArrayHandler({}, 'castKey', {}, ParentModel);
        const stagedHandler = {
            originValue: undefined as any, 
            typeCondition: arrayHandler.typeCondition
        };

        stagedHandler.originValue = []
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue= 20
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= undefined
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= '[]'
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= 'Bob'
        expect(stagedHandler.typeCondition()).toBeFalsy()
    })

    it('', () => {

    })

    it('', () => {

    })

})