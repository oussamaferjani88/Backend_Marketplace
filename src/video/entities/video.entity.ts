import { Produit } from 'src/produit/entities/produit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  fileName: string;

  @ManyToOne((type) => Produit, (produit) => produit.videos)
  produit: Produit;
}
