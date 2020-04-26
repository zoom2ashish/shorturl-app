import { Test, TestingModule } from '@nestjs/testing';
import { UrlManagerController } from './url-manager.controller';

describe('UrlManager Controller', () => {
  let controller: UrlManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlManagerController],
    }).compile();

    controller = module.get<UrlManagerController>(UrlManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
