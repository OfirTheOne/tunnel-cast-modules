test.todo('number.type-handler')


// import { FieldHandler } from '@tunnel-cast/core/field-handler';
import { NumberHandler } from './number.type-handler';



class ParentModel {}

describe('NumberHandler', () => {

    beforeEach(() => {

    })

    it('should contain the current typeName value.',() => {
        const handler = new NumberHandler({ someKey: 'someValue' },'someKey',{}, ParentModel);
        expect(handler.typeName).toEqual('number')

    }) 
    
    it('should validate value type, using typeCondition.', () => {

        const numberHandler = new NumberHandler({}, 'castKey', {}, ParentModel);
        const stagedHandler = {
            originValue: undefined as any, 
            typeCondition: numberHandler.typeCondition
        };

        stagedHandler.originValue= 20
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue = '20'
        expect(stagedHandler.typeCondition()).toBeFalsy()
        
        stagedHandler.originValue = 'bar'
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= undefined
        expect(stagedHandler.typeCondition()).toBeFalsy()
    })

    it('', () => {

    })

    it('', () => {

    })

})