import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , CreateDateColumn } from 'typeorm';


@Entity()
export class Achat {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  montant: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.achats)
  utilisateur: Utilisateur;

  @ManyToOne(() => Produit, (produit) => produit.achats)
  produit: Produit;
}
