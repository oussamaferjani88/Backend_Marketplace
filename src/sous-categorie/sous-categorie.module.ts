import { Module } from '@nestjs/common';
import { SousCategorieService } from './sous-categorie.service';
import { SousCategorieController } from './sous-categorie.controller';
import { SousCategorie } from './entities/sous-categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SousCategorie , Categorie])],

  controllers: [SousCategorieController],
  providers: [SousCategorieService]
})
export class SousCategorieModule {}
