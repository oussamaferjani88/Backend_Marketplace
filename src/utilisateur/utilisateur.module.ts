import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
//import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports : [TypeOrmModule.forFeature([Utilisateur]),
  MulterModule.register({
    dest: './uploads',
  }), 
],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
