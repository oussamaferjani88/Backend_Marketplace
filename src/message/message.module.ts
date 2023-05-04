import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService,
  {
    provide : 'MessageRepository',
    useClass : Repository<Message>,
  },
  
  
  ],
})
export class MessageModule {}
