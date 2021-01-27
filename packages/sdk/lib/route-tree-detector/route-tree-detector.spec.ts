import { NestContainer, NestFactory } from '@nestjs/core';

import { Controller, Delete, Get, Module, Post } from '@nestjs/common';
import { scanApplication, routesDataToJson } from './route-tree-detector';


@Controller('dogs')
export class DogsController {
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
  imports: [CatsModule],
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