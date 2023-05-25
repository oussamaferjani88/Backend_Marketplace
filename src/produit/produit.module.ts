import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit } from './entities/produit.entity';
import { Video } from '../video/entities/video.entity';
import { Image } from '../image/entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [TypeOrmModule.forFeature([ Produit, Image, Video ]), MulterModule.register({dest:'./uploads'})], 
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
