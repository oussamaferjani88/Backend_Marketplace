import { Test, TestingModule } from '@nestjs/testing';
import { KeywordMatchingController } from './keyword-matching.controller';
import { KeywordMatchingService } from './keyword-matching.service';

describe('KeywordMatchingController', () => {
  let controller: KeywordMatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordMatchingController],
      providers: [KeywordMatchingService],
    }).compile();

    controller = module.get<KeywordMatchingController>(KeywordMatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
