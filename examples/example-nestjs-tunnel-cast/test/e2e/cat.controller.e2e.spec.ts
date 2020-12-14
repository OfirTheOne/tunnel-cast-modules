import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
// import { } from '@tunnel-cast/core';

describe('CatController (e2e)', () => {
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
        
        expect(err).toBeDefined();
        const actualError = JSON.parse(req.error['text'])
        const { fieldName, errors} = actualError.message[0];

        expect(fieldName).toEqual('limit');
        expect(errors[0].code).toBeDefined();

        
        done(err);
      })
      
  });


});
