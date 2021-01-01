import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication, Param, UseInterceptors } from '@nestjs/common';
import * as request from 'supertest';
import { ErrorCode } from '@tunnel-cast/core/enums/error-code.enum';
import { CastModule } from '../../lib/cast.module';
import { CastParamInterceptor } from '../../lib/interceptors';
import { String, Required } from '@tunnel-cast/common';


class GetByIdParams {
    @Required(true)
    @String.StartsWith('id_is')
    @String()
    id: string
}

@Controller('entity')
class ExampleEntityController {
    @UseInterceptors(
        CastParamInterceptor(GetByIdParams)
    )
    @Get(':id')
    getById(@Param() params: GetByIdParams) {
        return { params };
    }
}



describe('Package Consumer - (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [
            CastModule.forFeature({})
        ],
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
