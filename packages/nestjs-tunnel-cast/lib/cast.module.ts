import { DynamicModule, Module } from '@nestjs/common';
import { CAST_METADATA_STORAGE } from './constants';
import { AsyncModelFactory } from './interfaces';
import { MetadataStorage } from './storage';


@Module({
    providers: [
        { 
            provide: CAST_METADATA_STORAGE, 
            useValue: new MetadataStorage() 
        }
    ]
})
export class CastModule {

    static forFeature(models: Array<{ name: string,  model: any}> = []): DynamicModule {
        const providers = [ { provide: CAST_METADATA_STORAGE, useValue: new MetadataStorage(models) } ] 
        return {
            module: CastModule,
            providers: providers,
            exports: providers,
        };
    }


    // TODO: implement this method
    static forFeatureAsync(
        factories: AsyncModelFactory[] = [],
    ): DynamicModule {
        throw Error('TODO: implement this method')
        const providers = [];//createMongooseAsyncProviders(connectionName, factories);
        // const imports = factories.map(factory => factory.imports || []);
        // const uniqImports = new Set(flatten(imports));

        return {
            module: CastModule,
            //   imports: [...uniqImports],
            providers: providers,
            exports: providers,
        };
    }
}