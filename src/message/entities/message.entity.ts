import {Entity , Column , PrimaryGeneratedColumn , ManyToOne , CreateDateColumn } from "typeorm"
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  contenu : string;

  @CreateDateColumn()
  date_envoi : Date;

  @Column({default : false})
  is_read : boolean;

  @Column()
  expediteur_id : number;

  @Column()
  recepteur_id : number;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.messages_envoyer)
  expediteur: Utilisateur;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.mssages_recues)
  recepteur: Utilisateur;

}
