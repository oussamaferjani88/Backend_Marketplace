import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import { Signal } from './entities/signal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Signal])],
  controllers: [SignalController],
  providers: [SignalService],
})
export class SignalModule {}
