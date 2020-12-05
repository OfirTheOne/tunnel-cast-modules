test.todo('boolean.type-handler')


// import { FieldHandler } from '@tunnel-cast/core/field-handler';
import { BooleanHandler } from './boolean.type-handler';



class ParentModel {}

describe('BooleanHandler', () => {

    beforeEach(() => {

    })

    it('should contain the current typeName value.',() => {
        const handler = new BooleanHandler({ someKey: 'someValue' },'someKey',{}, ParentModel);
        expect(handler.typeName).toEqual('boolean')

    }) 
    
    it('should validate value type, using typeCondition.', () => {

        const booleanHandler = new BooleanHandler({}, 'castKey', {}, ParentModel);
        const stagedHandler = {
            originValue: undefined as any, 
            typeCondition: booleanHandler.typeCondition
        };

        stagedHandler.originValue = false
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue = true
        expect(stagedHandler.typeCondition()).toBeTruthy();

        stagedHandler.originValue= 20
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= undefined
        expect(stagedHandler.typeCondition()).toBeFalsy()

        stagedHandler.originValue= 'false'
        expect(stagedHandler.typeCondition()).toBeFalsy()
    })

    it('', () => {

    })

    it('', () => {

    })

})