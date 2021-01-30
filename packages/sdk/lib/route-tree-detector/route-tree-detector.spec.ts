import { NestContainer, NestFactory } from '@nestjs/core';
import { Controller, Delete, Get, Module, Post } from '@nestjs/common';

import { String, Required } from "@tunnel-cast/common/decorator"
import { CastParam } from "@tunnel-cast/nestjs"
import { CastModule } from "@tunnel-cast/nestjs/cast.module"

import { scanApplication, routesDataToJson } from './route-tree-detector';


class GetByIdParams {
  @Required(true)
  @String()
  id: string
}


@Controller('dogs')
export class DogsController {

  @Get('/:id')
  getById(@CastParam() id: GetByIdParams): string {
    return 'This action returns dog by id';
  }

  @Get('/all')
  findAll(): string {
    return 'This action returns all dogs';
  }

  @Delete('/remove')
  deleteStuff(): string {
    return 'This action delete stuff';
  }
}

@Module({
  controllers: [DogsController],
  imports: [
    CastModule.forFeature()
  ],
})
export class DogsModule {}

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('/upload')
  uploadStuff(): string {
    return 'This action upload stuff';
  }
}

@Module({
  controllers: [CatsController],
  imports: [DogsModule]
})
export class CatsModule {}

@Module({
  imports: [
    CatsModule
  ],
})
export class AppModule {}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2')
  // const container: NestContainer = (app as any).container;

  const result = scanApplication(app)
  const resultAsJson = routesDataToJson(result);
  // const modules = container.getModules();
  
  console.log(JSON.stringify(resultAsJson, undefined, 2));

}

describe('route-tree', () => {

  it('boot', async () => {

    await bootstrap()
  })
})