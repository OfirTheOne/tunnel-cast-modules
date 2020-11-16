
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { extractValue } from '../utils/extract-value';
import { CastPipeTransformValue } from '../interfaces/cast-pipe-transform-value';

export const CastParameterDecorator =  <T>(extractionPath?: string) => {
  const decorator = createParamDecorator<unknown, ExecutionContext, CastPipeTransformValue<T>>(
    (data: unknown, ctx: ExecutionContext) => {
      const target = { 
        req: ctx.switchToHttp().getRequest(),
        res: ctx.switchToHttp().getResponse()
       }
      const extractedValue = extractValue<T>(target, extractionPath)
      return { extractedValue, path: extractionPath };
    },
  );
  return decorator
}




