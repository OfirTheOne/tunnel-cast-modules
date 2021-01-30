import { Controller, Get, BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { NestApplication } from "@nestjs/core";
import * as request from "supertest";
import { ErrorCode } from "@tunnel-cast/core/enums/error-code.enum";

import { CastModule } from "../cast.module";
import { CastQuery, CastParam, CastBody } from "./cast-parameter-decorator";
import { CAST_HTTP_PAYLOAD_TYPE_LIST } from "../constants"
import { HttpPayloadType } from "../enums";
import { HttpPayloadArgumentMetadata } from "../interfaces/http-payload-argument-metadata";
import { SampleModelB } from "../../test/assets/models";


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
  });


  it('should extract from ControllerTest01 the argument metadata as expected', () => {
    const ctrl = app.get(ControllerTest01);
    const ctrlPrototype = Object.getPrototypeOf(ctrl);

    const expectedList = [
      [ "requestHandlerCastQuery",  [ HttpPayloadType.QUERY ] ],
      [ "requestHandlerCastParam",  [ HttpPayloadType.PARAMS ] ],
      [ "requestHandlerCastBody",   [ HttpPayloadType.BODY ] ],
    ]

    expectedList.forEach(([methodName, payloadTypeList]) => {
      const actual: Array<HttpPayloadArgumentMetadata> = 
        Reflect.getMetadata(CAST_HTTP_PAYLOAD_TYPE_LIST, ctrlPrototype, methodName as string);
      expect(actual).toBeDefined();
      expect(actual.map(({payloadType}) => payloadType)).toEqual(payloadTypeList);
    })
  })

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