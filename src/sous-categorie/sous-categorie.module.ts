import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SousCategorieController } from './sous-categorie.controller';
import { SousCategorieService } from './sous-categorie.service';
import { SousCategorie } from './entities/sous-categorie.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { CategorieService } from 'src/categorie/categorie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SousCategorie, Categorie]), // Import both SousCategorie and Categorie entities
  ],
  controllers: [SousCategorieController],
  providers: [SousCategorieService, CategorieService], // Provide the SousCategorieService and CategorieService
})
export class SousCategorieModule {}
