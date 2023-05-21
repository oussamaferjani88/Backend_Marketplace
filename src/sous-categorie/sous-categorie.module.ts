import { Module } from '@nestjs/common';
import { SousCategorieService } from './sous-categorie.service';
import { SousCategorieController } from './sous-categorie.controller';
import { SousCategorie } from './entities/sous-categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SousCategorie])],
  controllers: [SousCategorieController],
  providers: [SousCategorieService]
})
export class SousCategorieModule {}
