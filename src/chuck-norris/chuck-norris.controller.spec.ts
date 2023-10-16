import { Test, TestingModule } from '@nestjs/testing';
import { ChuckNorrisController } from './chuck-norris.controller';
import { ChuckNorrisService } from './chuck-norris.service';

describe('ChuckNorrisController', () => {
  let controller: ChuckNorrisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChuckNorrisController],
      providers: [ChuckNorrisService],
    }).compile();

    controller = module.get<ChuckNorrisController>(ChuckNorrisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
