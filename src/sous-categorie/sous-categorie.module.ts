import { Module } from '@nestjs/common';
import { SousCategorieService } from './sous-categorie.service';
import { SousCategorieController } from './sous-categorie.controller';

@Module({
  controllers: [SousCategorieController],
  providers: [SousCategorieService]
})
export class SousCategorieModule {}
