import { createParamDecorator, ExecutionContext, ParamDecoratorEnhancer, Type } from "@nestjs/common";
import { CAST_HTTP_PAYLOAD_TYPE_LIST } from "../constants";
import { CastPipeTransformValue } from "../interfaces/cast-pipe-transform-value";
import { HttpPayloadArgumentMetadata } from "../interfaces/http-payload-argument-metadata";
import { extractValue } from "../utils/extract-value";
import { CastPipeFactory, CastPipe } from "../pipes";
import { HttpPayloadType } from "./../enums";

type CastParamDecorator = <T>(model?: Type<T> | string) => ParameterDecorator;

export function CastParameterDecoratorFactory(
  extractionPath?: string,
  payloadType?: HttpPayloadType
): CastParamDecorator {
  return <T>(model?: Type<T> | string) => {
    const decorator = CastParameterDecorator<T>(extractionPath, payloadType);
    if (model != undefined) {
      return decorator(CastPipeFactory(model));
    } else {
      return decorator(CastPipe);
    }
  };
}


export const CastParameterDecorator = <T>(extractionPath?: string, payloadType?: HttpPayloadType) => {

  const enhancers = payloadType ? [ assignHttpDataTypeMetadataEnhancer(payloadType) ] : [];
  const decorator = createParamDecorator<
    unknown,
    ExecutionContext,
    CastPipeTransformValue<T>
  >((data: unknown, ctx: ExecutionContext) => {
    const target = {
      req: ctx.switchToHttp().getRequest(),
      res: ctx.switchToHttp().getResponse()
    };
    const extractedValue = extractValue<T>(target, extractionPath);
    return { extractedValue, path: extractionPath };
  }, enhancers);
  return decorator;
};


function assignHttpDataTypeMetadataEnhancer(payloadType: HttpPayloadType): ParamDecoratorEnhancer {
  return function(target: any, key: string, index: number) {
    if(Reflect.hasMetadata(CAST_HTTP_PAYLOAD_TYPE_LIST, target, key)) {
      const payloadTypeList: Array<HttpPayloadArgumentMetadata> = Reflect.getMetadata(CAST_HTTP_PAYLOAD_TYPE_LIST, target, key);
      payloadTypeList.push({ payloadType, argumentIndex: index })
    } else {
      Reflect.defineMetadata(CAST_HTTP_PAYLOAD_TYPE_LIST,[ { payloadType, argumentIndex: index } ], target, key)
    }
  }
}