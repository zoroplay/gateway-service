import { Test, TestingModule } from '@nestjs/testing';
import { JackpotsController } from './jackpots.controller';

describe('JackpotsController', () => {
  let controller: JackpotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JackpotsController],
    }).compile();

    controller = module.get<JackpotsController>(JackpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
