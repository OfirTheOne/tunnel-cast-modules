import { ErrorCode } from '@tunnel-cast/core/errors/error-code.enum'

import { cast } from '../../../../cast';
import { string } from './string.decorator'

describe('string Decorator', () => {

    it('should validate the target field value with no errors', () => {
        
        class TestClass {
            @string()
            text: string
        }

        const value = { text: 'hello' };
        const result = cast(TestClass, value);

        expect(result.errors).toBeUndefined();
        expect(result.value).toEqual(value);

    })

    it('should validate the target field value with TypeConditionError', () => {
        
        class TestClass {
            @string()
            text: string
        }

        const value = { text: 300 };
        const result = cast(TestClass, value);

        expect(result.errors.length).toEqual(1);
        expect(result.errors[0].fieldName).toEqual('text');
        expect((result.errors[0].errors[0] as any).code).toEqual(ErrorCode.TypeConditionError);
    })

})