import { Test, TestingModule } from '@nestjs/testing';
import { TipstersController } from './tipsters.controller';

describe('TipstersController', () => {
  let controller: TipstersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipstersController],
    }).compile();

    controller = module.get<TipstersController>(TipstersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
