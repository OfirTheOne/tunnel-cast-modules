import { Controller, Get, BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CastModule } from "../cast.module";
import { SampleModelB } from "../../test/assets/models";
import {
  CastQuery,
  CastParam,
  CastBody
} from "./common-cast-parameter-decorator";
import { ErrorCode } from "@tunnel-cast/core/enums/error-code.enum";
import { HttpService } from "@nestjs/common/http/http.service";
import { of } from "rxjs";

// import Axios from 'axios';
import * as request from "supertest";
import { NestApplication } from "@nestjs/core";

@Controller("test")
class ControllerTest01 {
  @Get('query-test')
  requestHandlerCastQuery(@CastQuery() query: SampleModelB) {
    return { query };
  }

  @Get('param-test/:limit/:skip/:name')
  requestHandlerCastParam(@CastParam() param: SampleModelB) {
    return { param };
  }

  @Get('body-test')
  requestHandlerCastBody(@CastBody() body: SampleModelB) {
    return { body };
  }
}

describe("Common Cast Decorators", () => {

  let app: NestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CastModule.forFeature()],
      controllers: [ControllerTest01]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // request  = supertest(httpService) as supertest.SuperAgentTest;
    // control = moduleRef.get<ControllerTest01>(ControllerTest01);
  });

  it("should test request query and return an error for missing name", async done => {
    testController(
      app,
      {
        url: "/test/query-test",
        received: {
          limit: 30,
          skip: 10
        },
        assertionKey: 'query',
        status: 400,
        errors: [
          {
            fieldName: "name",
            errors: [{ code: ErrorCode.FieldRequiredError }]
          }
        ]
      },
      done
    );
  });


  it("should test request params and return an error", async done => {
    testController(
      app,
      {
        url: "/test/param-test/10/15/something",
        received: undefined,
        assertionKey: 'params',
        status: 400,
        errors: [
          {
            fieldName: "name",
            errors: [{ code: ErrorCode.TypeValidationError }]
          }
        ]
      },
      done
    );
  });


  it("should test request body and return an error for missing name", async done => {
    testController(
      app,
      {
        url: "/test/body-test",
        received: {
          limit: 30,
          skip: 10
        },
        assertionKey: 'body',
        status: 400,
        errors: [
          {
            fieldName: "name",
            errors: [{ code: ErrorCode.FieldRequiredError }]
          }
        ]
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
    received: any;
    assertionKey: string;
    url: string;
    status: number;
    errors?: Array<any>;
  },
  done: Function
) {
  let testRequest = request(app.getHttpServer())
    .get(options.url)
    .expect(options.status);


  testRequest = insertRequestData(testRequest, options.received, options.assertionKey);

  testRequest.end((err, req) => {
    if (options.errors) {
      const { body } = req;
      expect(body).toBeDefined();
      const errors = body;
      expect(errors).toEqual(options.errors);
    }
    done();
  });
}



function insertRequestData(reqTest: request.Test, received: any, assertionKey: string) {

  switch(assertionKey) {
    case 'body': 
      return reqTest.send(received);

    case 'query': 
      return reqTest.query(received);

    default: 
      return reqTest;
    
  }

}