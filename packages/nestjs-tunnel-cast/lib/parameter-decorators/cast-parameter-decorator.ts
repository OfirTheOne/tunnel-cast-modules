
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CastParameterDecorator =  <T>(from: 'req' | 'res', extractFieldName?: string) => {
  const decorator = createParamDecorator<unknown, ExecutionContext, T>(
    (data: unknown, ctx: ExecutionContext) => {
      const reqOrRes = from == 'req' ? ctx.switchToHttp().getRequest() : ctx.switchToHttp().getResponse();
      return (extractFieldName ? reqOrRes[extractFieldName] : reqOrRes) as T;
    },
  );
  return decorator
}




