import { cast } from "./cast";
import { CastResult } from "../../models/interfaces/cast-result";



/**
 * @description Perform the cast process, if any messages as returned tey will be thrown as error, 
 * else the resolvedObject will be returned by this function. 
 * 
 * @param model 
 * @param target 
 * @param options 
 */
export function castOrReject<T=any>(model: new (...args: any[]) => T, target: any, options?: any): CastResult<T>['resolvedValue'] {
    const castResult = cast(model, target, options);
    if(castResult.messages?.length > 0) {
        throw castResult.messages;
    } else {
        return castResult.resolvedValue;
    }
}