import { Produit } from 'src/produit/entities/produit.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { Message } from 'src/message/entities/message.entity';
import { Signal } from 'src/signal/entities/signal.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_complet: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  num_tlf: string;

  @Column({ nullable: true })
  localisation: string;

  @Column({ nullable: true })
  est_interdit: boolean;

  @Column({ nullable: true })
  note: number;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Produit, (produit) => produit.utilisateur)
  produits: Produit[];

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.utilisateur)
  evaluations: Evaluation[];

  @OneToMany((type) => Boutique, (boutique) => boutique.utilisateur)
  boutiques: Boutique[];

  @OneToMany((type) => Signal, (signal) => signal.utilisateur)
  signals: Signal[];

  @OneToMany((type) => Message, (message) => message.expediteur)
  Messagesenvoyer: Message[];

  @OneToMany((type) => Message, (message) => message.recepteur)
  Messagesrecus: Message[];
}
