
import { Type } from '@nestjs/common'
import { CastPipeFactory, CastPipe } from '../pipes'
import { CastParameterDecorator } from './cast.parameter-decorator'

type CastParamDecorator = <T>(model?: Type<T> | string) => ParameterDecorator 

export function CastParameterDecoratorFactory(extractionPath?: string): 
  CastParamDecorator {
    return <T>(model?: Type<T> | string) => {
      const decorator = CastParameterDecorator<T>(extractionPath)
      if(model != undefined) {
        return decorator(CastPipeFactory(model))
      } else {
        return decorator(CastPipe)
      }

    } 
}

