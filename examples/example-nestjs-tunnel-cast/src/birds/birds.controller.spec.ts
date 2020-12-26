import { Test, TestingModule } from '@nestjs/testing';
import { BirdsController } from './birds.controller';
import { CastModule } from '@tunnel-cast/nestjs/cast.module'
describe('BirdsController', () => {
  let controller: BirdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CastModule.forFeature()
      ],
      controllers: [BirdsController],
    }).compile();

    controller = module.get<BirdsController>(BirdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
