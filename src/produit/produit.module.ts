import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit } from './entities/produit.entity';
import { Video } from '../video/entities/video.entity';
import { Image } from '../image/entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ Produit, Image, Video, Utilisateur]), MulterModule.register({dest:'./uploads'})], 
  controllers: [ProduitController],
  providers: [ProduitService ],
})
export class ProduitModule {}
