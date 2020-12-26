import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CastModule } from '@tunnel-cast/nestjs/cast.module'
describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CastModule.forFeature()
      ],
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
