import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ErrorCode } from '@tunnel-cast/core/enums/error-code.enum';

describe('CatController - /cats (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET), empty values - should return default.', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        query: {
          skip: 0,
          limit: 10,
        }
      });
  });

  
  it('/ (GET), invalid values - should return error.', (done) => {
    return request(app.getHttpServer())
      .get('/cats')
      .query({
        skip: 0,
        limit: 50,        
      })
      .expect(400)
      .end((err, req) => {
        expect(req.error).toBeDefined();
        let actualError = JSON.parse(req.error['text']);
        const { fieldName, errors } = actualError[0];
        expect(fieldName).toEqual('limit');
        expect(errors[0].code).toEqual(ErrorCode.TypeValidationError);

        done();
      })
      
  });

  
  it('/ (GET), valid values - should return body correctly.', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .query({
        skip: 5,
        limit: 10,        
      })
      .expect(200)
      .expect({
        query: {
          skip: 5,
          limit: 10,
        }
      });
      
  });


  it('/:type (GET), valid values - should return body correctly.', () => {
    const typeValue = 'bobcat'
    return request(app.getHttpServer())
      .get(`/cats/${typeValue}`)
      .expect(200)
      .expect({
        params: {
          type: typeValue
        }
      });
  });

  it('/:type (GET), invalid values - should return error.', (done) => {
    const typeValue = 'badValue'
    return request(app.getHttpServer())
      .get(`/cats/${typeValue}`)
      .expect(400)
      .end((err, req) => {
        expect(req.error).toBeDefined();
        let actualError = JSON.parse(req.error['text']);
        const { fieldName, errors } = actualError[0];
        expect(fieldName).toEqual('type');
        expect(errors[0].code).toEqual(ErrorCode.TypeValidationError);

        done();
      })
  });




});
