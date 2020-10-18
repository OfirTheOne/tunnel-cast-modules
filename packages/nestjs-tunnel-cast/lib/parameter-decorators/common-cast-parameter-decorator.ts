import { 
    CastParameterDecoratorFactory,
    CastParameterDecoratorInferFactory
} from "./cast.parameter-decorator.factory";

export const CastQuery = CastParameterDecoratorFactory('req', 'query')
export const CastParam = CastParameterDecoratorFactory('req', 'params')
export const CastBody = CastParameterDecoratorFactory('req', 'body')


export const CastQueryInfer = CastParameterDecoratorInferFactory('req', 'query')
export const CastParamInfer = CastParameterDecoratorInferFactory('req', 'params')
export const CastBodyInfer = CastParameterDecoratorInferFactory('req', 'body')