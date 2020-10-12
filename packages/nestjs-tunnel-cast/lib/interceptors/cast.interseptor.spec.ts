import { CallHandler, ExecutionContext } from '@nestjs/common';
import { CastQueryInterceptor } from './common-cast-interceptor';
import { QueryTest01, QueryTest02 } from '../../test/assets/models'
import { HttpArgumentsHost, NestInterceptor } from '@nestjs/common/interfaces';



describe('CastQueryInterceptor', () => {
    const interceptor = new (CastQueryInterceptor(QueryTest01))();

    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });

    it('should execute intercept and **pass** cast model', async () => {
        await testInterceptor(
            interceptor, 
            {
                request: {
                    query: { skip: 10, limit: 20, name: 'bob' }
                },
                next: undefined
            },
            {
                request: {
                    query: { skip: 10, limit: 20, name: 'bob' }
                },
                next: undefined
            }
        );
    });

    it('should execute intercept and **fail** cast model', async () => {
        await testInterceptor(
            interceptor, 
            {
                request: {
                    query: { skip: 10, limit: 'hello', name: 'bob' }
                },
                next: undefined,
                error: [
                    {
                        fieldName:'limit',
                        errors: [ { code: 4 } ]
                    }
                ]
            },
            {
                request: {
                    query: { skip: 10, limit: 20, name: 'bob' }
                },
                next: undefined,
                errorTransform: (e: Array<any>) => 
                    e.map(({fieldName, errors}) => ({
                        fieldName, 
                        errors: errors.map(({code}) => ({code}))
                    }))
            }
        );
    });

});


async function testInterceptor(
    interceptor: NestInterceptor<any, any>, 
    mock: {request: any, next: any, error?: any}, 
    expected: {request: any, next: any, errorTransform?: (e:any) => any}
) {
    const executionContextHost: HttpArgumentsHost = {
        getRequest: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis(),
        getNext: jest.fn().mockReturnThis()
    };
    const executionContext: Partial<ExecutionContext> = {
        switchToHttp: jest.fn().mockReturnValue(executionContextHost),
    };
    const callHandler = {
        handle: jest.fn()
    };

    (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValue(mock.request);

    callHandler.handle.mockResolvedValueOnce(mock.next);

    try {
        const actualValue = await interceptor.intercept(executionContext as ExecutionContext, callHandler);
        expect(actualValue).toBe(mock.next);
        expect(executionContext.switchToHttp().getRequest().query).toEqual(expected.request.query);
        expect(callHandler.handle).toBeCalledTimes(1);
    } catch (error) {
        expect(expected?.errorTransform(error.response.originError) || error).toEqual(mock.error)
    }


}

