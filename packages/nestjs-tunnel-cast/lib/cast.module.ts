import { DynamicModule, Module } from '@nestjs/common';
import { CAST_METADATA_STORAGE, CAST_MODULE_OPTIONS } from './constants';
import { AsyncModelFactory, CastModuleFactoryParameters, CastModuleOptions } from './interfaces';
import { MetadataStorage } from './storage';


import { defaultOptions } from './cast-module-default-options'
@Module({
    providers: [
        { 
            provide: CAST_METADATA_STORAGE, 
            useValue: new MetadataStorage() 
        },
        { 
            provide: CAST_MODULE_OPTIONS, 
            useValue: defaultOptions
        }
    ]
})
export class CastModule {

    static forFeature(factoryParams: Partial<CastModuleFactoryParameters> ): DynamicModule {
        const providers = this.buildFeatureProviders(factoryParams); 
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


    private static buildFeatureProviders(factoryParams: Partial<CastModuleFactoryParameters>) {
        const providers = [ 
            { 
                provide: CAST_METADATA_STORAGE, 
                useValue: new MetadataStorage(factoryParams.models||[]) 
            },
            { 
                provide: CAST_MODULE_OPTIONS, 
                useValue: {
                    castError: factoryParams.castError || defaultOptions.castError,
                    transformError: factoryParams.transformError || defaultOptions.transformError
                } as CastModuleOptions
            }
        ] 
        return providers;
    }
}