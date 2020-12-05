import { ErrorCode } from '@tunnel-cast/core/errors/error-code.enum'

import { cast } from '../../../../cast';
import { boolean } from './boolean.decorator'

describe('Boolean Decorator', () => {

    it('should validate the target field value with no errors', () => {
        
        class TestClass {
            @boolean()
            flag: boolean
        }

        const value = { flag: false };
        const result = cast(TestClass, value);

        expect(result.errors).toBeUndefined();
        expect(result.value).toEqual(value);

    })

    it('should validate the target field value with TypeConditionError', () => {
        
        class TestClass {
            @boolean()
            flag: boolean
        }

        const value = { flag: 'false' };
        const result = cast(TestClass, value);

        expect(result.errors.length).toEqual(1);
        expect(result.errors[0].fieldName).toEqual('flag');
        expect((result.errors[0].errors[0] as any).code).toEqual(ErrorCode.TypeConditionError);
    })

})