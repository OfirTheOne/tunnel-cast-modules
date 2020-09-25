import { FieldHandler } from '../field-handler/field-handler';
import { Class } from '../../utils/model';

export class TypeRegistry {

    protected constructor() {}

    protected static instance: TypeRegistry;

    protected registry: Map<string | symbol, Class<FieldHandler>> = new Map();

    static fetch(): TypeRegistry {
        if(!TypeRegistry.instance) {
            TypeRegistry.instance = new TypeRegistry();
        }
        return TypeRegistry.instance;
    }

    public register(type: string | symbol, handlerClass: Class<FieldHandler>) {
        this.registry.set(type, handlerClass);
    }

    public get(key: string | symbol) {
        try {
            if(this.registry.has(key)) {
                return this.registry.get(key)
            } 
            throw Error(`Handler for type ${key.toString()} was not register.`)
        } catch (error) {
            throw error;
        }
    }
}