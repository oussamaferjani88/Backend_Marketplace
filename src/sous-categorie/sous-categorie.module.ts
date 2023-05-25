import { Module } from '@nestjs/common';
import { SousCategorieService } from './sous-categorie.service';
import { SousCategorieController } from './sous-categorie.controller';
import { SousCategorie } from './entities/sous-categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([SousCategorie , Categorie])],

=======
  imports: [TypeOrmModule.forFeature([SousCategorie])],
>>>>>>> d74856cac1691a0fa9a471dd8ad01ce1e286eae0
  controllers: [SousCategorieController],
  providers: [SousCategorieService]
})
export class SousCategorieModule {}
