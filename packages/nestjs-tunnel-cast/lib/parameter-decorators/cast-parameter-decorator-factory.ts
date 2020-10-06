
import { Type } from '@nestjs/common'
import { Request as eRequest, Response as eResponse } from 'express'
import { CastPipe } from '../pipes'
import { CastParameterDecorator } from './cast-parameter-decorator'


export function CastParameterDecoratorFactory(from: "req", fieldName: keyof eRequest): <T>(model: Type<T>) => ParameterDecorator;
export function CastParameterDecoratorFactory(from: "res", fieldName: keyof eResponse): <T>(model: Type<T>) => ParameterDecorator;
export function CastParameterDecoratorFactory(from: "res"): (model: any) => ParameterDecorator;
export function CastParameterDecoratorFactory(from: "req"|"res", fieldName?: string): <T>(model: Type<T>) => ParameterDecorator  {
    return <T>(model: Type<T>) => {
      const decorator = CastParameterDecorator<T>(from, fieldName)
      return decorator(CastPipe(model))
    } 
}
