
import { RegisteredTypeProvider } from './registered-type-provider';

export class TypeRegistry {

    protected constructor() {}

    protected static instance: TypeRegistry;

    protected registry: Map<string | symbol, RegisteredTypeProvider> = new Map();

    static getInstance(): TypeRegistry {
        if(!TypeRegistry.instance) {
            TypeRegistry.instance = new TypeRegistry();
        }
        return TypeRegistry.instance;
    }

    public register(type: string | symbol, provider: RegisteredTypeProvider) {
        this.registry.set(type, provider);
    }

    public get(key: string | symbol) {
        try {
            if(this.registry.has(key)) {
                return this.registry.get(key)
            } 
            throw Error(`Provider for identifier ${key.toString()} was not register.`)
        } catch (error) {
            throw error;
        }
    }
}