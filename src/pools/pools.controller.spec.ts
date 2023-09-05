import { Test, TestingModule } from '@nestjs/testing';
import { PoolsController } from './pools.controller';

describe('PoolsController', () => {
  let controller: PoolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoolsController],
    }).compile();

    controller = module.get<PoolsController>(PoolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
