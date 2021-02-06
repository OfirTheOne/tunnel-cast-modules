import { CastParameterDecoratorFactory } from "./cast-parameter-decorator.factory";
import { HttpPayloadType } from "../enums";

export const CastQuery = CastParameterDecoratorFactory("req.query", HttpPayloadType.QUERY);
export const CastParam = CastParameterDecoratorFactory("req.params", HttpPayloadType.PARAMS);
export const CastBody = CastParameterDecoratorFactory("req.body", HttpPayloadType.BODY);
export const CastHeaders = CastParameterDecoratorFactory("req.headers", HttpPayloadType.HEADERS);
