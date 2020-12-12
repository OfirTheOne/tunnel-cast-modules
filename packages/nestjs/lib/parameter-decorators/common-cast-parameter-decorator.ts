import { 
    CastParameterDecoratorFactory,
} from "./cast.parameter-decorator.factory";

export const CastQuery = CastParameterDecoratorFactory('req.query')
export const CastParam = CastParameterDecoratorFactory('req.params')
export const CastBody = CastParameterDecoratorFactory('req.body')
