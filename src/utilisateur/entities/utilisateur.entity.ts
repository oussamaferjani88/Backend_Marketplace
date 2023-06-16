import { Produit } from 'src/produit/entities/produit.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { Message } from 'src/message/entities/message.entity';
import { Signal } from 'src/signal/entities/signal.entity';
import { Achat } from 'src/achat/entities/achat.entity';
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

  @Column({ default : false })
  est_interdit: boolean;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Produit, (produit) => produit.utilisateur , { cascade: true })
  produits: Produit[];

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.utilisateur)
  evaluations: Evaluation[];

  @OneToMany((type) => Boutique, (boutique) => boutique.utilisateur)
  boutiques: Boutique[];


  @OneToMany((type) => Message, (message) => message.expediteur)
  messages_envoyer: Message[];

  @OneToMany((type) => Message, (message) => message.recepteur)
  mssages_recues: Message[];

  @OneToMany(() => Achat, (achat) => achat.utilisateur)
  achats: Achat[];

}
