import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
@Module({
  imports: [TypeOrmModule.forFeature([Categorie]) ,  MulterModule.register({
    dest: './uploads',
  }),],
  controllers: [CategorieController],
  providers: [CategorieService
  ],
})
export class CategorieModule {}
