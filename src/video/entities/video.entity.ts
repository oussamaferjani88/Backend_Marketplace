import { Produit } from 'src/produit/entities/produit.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nomV: string;

  @Column()
  fileName: string;

  @ManyToOne(() => Produit, (produit) => produit.videos, { onDelete: 'CASCADE' })
  produit: Produit;
}
