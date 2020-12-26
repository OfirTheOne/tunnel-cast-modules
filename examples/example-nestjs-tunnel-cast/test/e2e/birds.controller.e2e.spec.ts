import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ErrorCode } from '@tunnel-cast/core/enums/error-code.enum';

describe('BirdsController - /birds (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET), empty values - should required error.', (done) => {

    return request(app.getHttpServer())
      .get('/birds')
      .expect(400)
      .end((err, req) => {
        expect(req.error).toBeDefined();
        let actualError = JSON.parse(req.error['text']);
        // actualError = JSON.parse(actualError.message);
        const { fieldName, errors } = actualError[0];
        expect(fieldName).toEqual('searchTerm');
        expect(errors[0].code).toEqual(ErrorCode.FieldRequiredError);

        done();
      })
  });

  
  it('/ (GET), invalid values - should return error.', (done) => {
    return request(app.getHttpServer())
      .get('/birds')
      .query({
        searchTerm: '123',
        skip: 0,
        limit: 50,        
      })
      .expect(400)
      .end((err, req) => {
        expect(req.error).toBeDefined();
        let actualError = JSON.parse(req.error['text']);

        let { fieldName: fieldName01, errors: errors01 } = actualError[0];
        expect(fieldName01).toEqual('searchTerm');
        expect(errors01[0].code).toEqual(ErrorCode.TypeValidationError);
        let { fieldName: fieldName02, errors: errors02 } = actualError[1];
        expect(fieldName02).toEqual('limit');
        expect(errors02[0].code).toEqual(ErrorCode.TypeValidationError);

        done();
      })
      
  });

  
  it('/ (GET), valid values - should return body correctly.', () => {
    return request(app.getHttpServer())
      .get('/birds')
      .query({
        searchTerm: 'bob',
        skip: 5,
        limit: 10,        
      })
      .expect(200)
      .expect({
        query: {
          searchTerm: 'bob',
          skip: 5,
          limit: 10,
        }
      });
      
  });


  it('/:type (GET), valid values - should return body correctly.', (done) => {
    const typeValue = 'flying_cow'
    return request(app.getHttpServer())
      .get(`/birds/${typeValue}`)
      .end((e, r) => {
        
        console.log(e, r.body, r.text)
        done(e)

      })
      // .expect(200)
      // .expect({
      //   params: {
      //     type: typeValue
      //   }
      // });
  });


  it.skip('/:type (GET), invalid values - should return error.', (done) => {
    const typeValue = 'badValue'
    return request(app.getHttpServer())
      .get(`/cats/${typeValue}`)
      .expect(400)
      .end((err, req) => {
        expect(req.error).toBeDefined();
        let actualError = JSON.parse(req.error['text']);
        actualError = JSON.parse(actualError.message);
        const { fieldName, errors } = actualError[0];
        expect(fieldName).toEqual('type');
        expect(errors[0].code).toEqual(ErrorCode.TypeValidationError);

        done();
      })
  });

});
