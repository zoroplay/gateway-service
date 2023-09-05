import { Test, TestingModule } from '@nestjs/testing';
import { BetsController } from './bets.controller';

describe('BetsController', () => {
  let controller: BetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetsController],
    }).compile();

    controller = module.get<BetsController>(BetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
