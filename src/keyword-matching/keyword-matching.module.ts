import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordMatchingService } from './keyword-matching.service';
import { KeywordMatchingController } from './keyword-matching.controller';
import { Produit } from 'src/produit/entities/produit.entity'; // Import the entity associated with your database table

@Module({
  imports: [
    TypeOrmModule.forFeature([Produit]), // Add your entity to the TypeOrmModule imports
  ],
  providers: [KeywordMatchingService],
  controllers: [KeywordMatchingController],
})
export class KeywordMatchingModule {}
