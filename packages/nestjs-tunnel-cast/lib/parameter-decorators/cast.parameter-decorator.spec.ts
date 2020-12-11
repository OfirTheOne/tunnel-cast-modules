import { Controller, Get, BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CastModule } from '../cast.module';
import { QueryTest02 } from '../../test/assets/models';
import { CastQuery, CastParam, CastBody } from './common-cast-parameter-decorator';
import { ErrorCode } from '@tunnel-cast/core/enums/error-code.enum'
import { HttpService } from '@nestjs/common/http/http.service';
import { of } from 'rxjs';

// import Axios from 'axios';
import * as request from 'supertest'
import { AxiosResponse } from 'axios';
import { NestApplication } from '@nestjs/core';

@Controller('test')
class ControllerTest01 {

    @Get()
    requestHandler(@CastQuery() query: QueryTest02) {
        return query;
    }
}


describe('Common Cast Decorators', () => {
    // let control: ControllerTest01;
    let httpService: HttpService;
    let app: NestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CastModule.forFeature(),
            ],
            controllers: [ControllerTest01],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        // request  = supertest(httpService) as supertest.SuperAgentTest;
        // control = moduleRef.get<ControllerTest01>(ControllerTest01);
    });


    it('should return an array of cats', async (done) => {

            testController(
                app, 
                {
                    url: '/test', 
                    query: {
                        limit: 30,
                        skip: 10,
                    },
                    status: 400,
                    errors: [
                        {
                            fieldName: 'name', 
                            errors: [ { code: ErrorCode.FieldRequiredError}]
                        }
                    ],
                }, 
                done
            );
    });

    afterAll(async () => {
        await app.close();
      });
});


function testController(
    app: NestApplication, 
    options: {
        url: string,
        query?: any, 
        body?: any, 
        status: number,
        errors?: Array<any>,
    },
    done: Function
) {
    
    let testRequest = request(app.getHttpServer())
        .get(options.url)
        .expect(options.status);

    testRequest = options.query ? testRequest.query(options.query) : testRequest;
    testRequest = options.body ? testRequest.send(options.body) : testRequest;

    testRequest.end((err, req) => {
        if(options.errors) {
            const { body } = req;
            expect(body).toBeDefined();
            const { message } = body;
            const errors: Array<any> = JSON.parse(message);
            expect(errors).toEqual(options.errors);

        }
        done();
    })
   
}