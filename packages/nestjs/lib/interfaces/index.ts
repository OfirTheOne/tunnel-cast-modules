// import { ModuleMetadata } from '@nestjs/common/interfaces';
// // import { ModelDefinition } from './model-definition.interface';

import { Type } from "@nestjs/common";

// export interface AsyncModelFactory
//   extends Pick<ModuleMetadata, 'imports'>,
//     Pick<ModelDefinition, 'name' | 'collection'> {
//   useFactory: (
//     ...args: any[]
//   ) => ModelDefinition['schema'] | Promise<ModelDefinition['schema']>;
//   inject?: any[];
// }

export interface AsyncModelFactory {}

export interface CastModuleFactoryParameters {
  models: Array<{ name: string; model: Type<any> }>;
  castError: Type<Error>;
  transformError: Function;
}

export interface CastModuleOptions
  extends Partial<Omit<CastModuleFactoryParameters, "models">> {}
