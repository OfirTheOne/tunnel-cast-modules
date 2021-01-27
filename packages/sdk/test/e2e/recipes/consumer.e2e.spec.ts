import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication, Param, UseInterceptors } from '@nestjs/common';
import * as request from 'supertest';


class GetByIdParams {

    id: string
}

@Controller('entity')
class ExampleEntityController {
    @Get(':id')
    getById(@Param() params: GetByIdParams) {
        return { params };
    }
}



describe('Package Consumer - (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [],
        controllers: [ExampleEntityController],
    }).compile();


    app = moduleRef.createNestApplication();
    await app.init();
  });


  
  it.only('/:type (GET), valid values - should return body correctly.', () => {
    const idValue = 'id_is_1'
    return request(app.getHttpServer())
      .get(`/entity/${idValue}`)
      .expect(200)
      .expect({
        params: {
          id: idValue
        }
      });
  });

});
