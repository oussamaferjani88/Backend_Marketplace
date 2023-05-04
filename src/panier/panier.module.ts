import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { Panier } from './entities/panier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Module({
  imports : [TypeOrmModule.forFeature([Panier])],
  controllers: [PanierController],
  providers: [PanierService,
    {
      provide : "PanierRepository",
      useClass : Repository<Panier>,
    },

  ],
})
export class PanierModule {}
