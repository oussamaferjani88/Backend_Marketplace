import { Test, TestingModule } from '@nestjs/testing';
import { KeywordMatchingService } from './keyword-matching.service';

describe('KeywordMatchingService', () => {
  let service: KeywordMatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordMatchingService],
    }).compile();

    service = module.get<KeywordMatchingService>(KeywordMatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
