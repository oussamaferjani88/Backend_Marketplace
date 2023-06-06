import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToOne , JoinColumn } from "typeorm"

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  contenu : string;

  @Column()
  date_envoi : Date;

  @Column()
  is_read : boolean;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.envoyeur)
  expediteur: Utilisateur;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.receveur)
  recepteur: Utilisateur;
}
