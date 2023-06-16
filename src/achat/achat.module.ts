import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achat } from './entities/achat.entity';
import { AchatService } from './achat.service';
import { AchatController } from './achat.controller';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { Produit } from 'src/produit/entities/produit.entity';
import { ProduitModule } from 'src/produit/produit.module'; // Import the ProduitModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Achat]),
    TypeOrmModule.forFeature([Utilisateur]),
    TypeOrmModule.forFeature([Produit]), // Include the Produit entity in the module
    UtilisateurModule,
    ProduitModule, // Import the ProduitModule
  ],
  controllers: [AchatController],
  providers: [AchatService],
})
export class AchatModule {}
