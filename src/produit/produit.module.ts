import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProduitController],
  providers: [ProduitService , 
    
    {
      provide : "ProduitRepository",
      useClass : Repository<Produit>,

    },


  
  ],
})
export class ProduitModule {}
