import { Test, TestingModule } from '@nestjs/testing';
import { SousCategorieController } from './sous-categorie.controller';
import { SousCategorieService } from './sous-categorie.service';

describe('SousCategorieController', () => {
  let controller: SousCategorieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SousCategorieController],
      providers: [SousCategorieService],
    }).compile();

    controller = module.get<SousCategorieController>(SousCategorieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
