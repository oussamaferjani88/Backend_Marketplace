import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import { Signal } from './entities/signal.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports : [TypeOrmModule.forFeature([Signal])],
  controllers: [SignalController],
  providers: [SignalService,
  
  {
    provide : "SignalRepository",
    useClass : Repository<Signal>,
  },
  
  ],
})
export class SignalModule {}
