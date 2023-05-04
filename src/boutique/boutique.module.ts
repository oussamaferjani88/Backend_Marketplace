import { Module } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueController } from './boutique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boutique } from './entities/boutique.entity';
@Module({
  imports : [TypeOrmModule.forFeature([Boutique])],
  controllers: [BoutiqueController],
  providers: [BoutiqueService ,
  {
    provide : 'BoutiqueRepository',
    useClass : Repository<Boutique>,
  }
  
  
  ],
})
export class BoutiqueModule {}
