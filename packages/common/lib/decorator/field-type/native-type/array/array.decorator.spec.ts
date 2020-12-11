import { ErrorCode } from '@tunnel-cast/core/enums/error-code.enum'

import { cast } from '../../../../cast';
import { array } from './array.decorator'

describe('Array Decorator', () => {

    it('should validate the target field value with no errors', () => {
        
        class TestClass {
            @array()
            list: Array<string>
        }

        const value = { list: [] };
        const result = cast(TestClass, value);

        expect(result.errors).toBeUndefined();
        expect(result.value).toEqual(value);

    })

    it('should validate the target field value with TypeConditionError', () => {
        
        class TestClass {
            @array()
            list: Array<string>
        }

        const value = { list: 'hello' };
        const result = cast(TestClass, value);

        expect(result.errors.length).toEqual(1);
        expect(result.errors[0].fieldName).toEqual('list');
        expect((result.errors[0].errors[0] as any).code).toEqual(ErrorCode.TypeConditionError);
    })

})