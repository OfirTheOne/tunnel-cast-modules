import { TypeRegistry } from '../../type-registry'
import { TypeHandlerId } from './type-handler-id.symbol';
import { ArrayHandler } from './array-handler'

TypeRegistry
    .getInstance()
    .register(TypeHandlerId, ArrayHandler);

export { ArrayHandler } from './array-handler'