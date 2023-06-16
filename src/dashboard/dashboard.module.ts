import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Produit } from 'src/produit/entities/produit.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Produit, Utilisateur, Categorie])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
