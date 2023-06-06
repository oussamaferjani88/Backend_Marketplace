import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message , Utilisateur])],
  providers: [MessageService, MessageGateway, UtilisateurService]
})
export class MessageModule {}
