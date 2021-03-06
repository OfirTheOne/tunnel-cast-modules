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
export class DogsModule { }

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
export class CatsModule { }

@Module({
  imports: [
    CatsModule
  ],
})
export class AppModule { }


describe('route-tree', () => {

  it('should run scanApplication on the cats & dogs application and return app data correctly.', async () => {

    const globalPrefix = 'api/v2';
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);

    const result = scanApplication(app);
    const resultAsJson = routesDataToJson(result);

    expect(resultAsJson.globalPrefix).toEqual(globalPrefix);
    expect(resultAsJson.routes.length).toEqual(2);
    expect(resultAsJson.routes[0].name).toEqual(CatsController.name);
    expect(resultAsJson.routes[0].path).toEqual('cats');
    expect(resultAsJson.routes[0].endpoints.length).toEqual(2);
    expect(resultAsJson.routes[0].endpoints[0]).toEqual({
      "name": "findAll", "path": "/", "method": "get", "payload": []
    });
    expect(resultAsJson.routes[0].endpoints[1]).toEqual(    {
      "name": "uploadStuff", "path": "/upload", "method": "post", "payload": []
    });
    expect(resultAsJson.routes[1].name).toEqual(DogsController.name);
    expect(resultAsJson.routes[1].path).toEqual('dogs');
    expect(resultAsJson.routes[1].endpoints.length).toEqual(3);
    expect(resultAsJson.routes[1].endpoints[0]).toEqual({
      "name": "getById", "path": "/:id", "method": "get",
      "payload": [{ "type": "params", "schemeName": "GetByIdParams" }]
    });
    expect(resultAsJson.routes[1].endpoints[1]).toEqual({
      "name": "findAll", "path": "/all", "method": "get", "payload": []
    });
    expect(resultAsJson.routes[1].endpoints[2]).toEqual({
      "name": "deleteStuff", "path": "/remove", "method": "delete", "payload": []
    });

  })
})