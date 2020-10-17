
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
        this.registry.set(typeof type == 'symbol' ? String(type) : type, provider);
    }

    public get(key: string | symbol) {
        const keyAsString = typeof key == 'symbol' ? String(key) : key;
        try {
            if(this.registry.has(keyAsString)) {
                return this.registry.get(keyAsString)
            } 
            throw Error(`Provider for identifier ${keyAsString} was not register.`)
        } catch (error) {
            throw error;
        }
    }
}