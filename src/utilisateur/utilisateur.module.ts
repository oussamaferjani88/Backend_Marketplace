import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
@Module({
  imports : [TypeOrmModule.forFeature([Utilisateur])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService , 
  
  {
    provide : "UtilisateurRepository",
    useClass : Repository<Utilisateur>,
  },
  
  ], 
})
export class UtilisateurModule {}
