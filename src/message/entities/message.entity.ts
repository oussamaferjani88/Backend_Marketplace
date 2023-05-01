import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  message : string;

  @Column()
  date_envoi : Date;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.Messagesenvoyer)
  expediteur: Utilisateur;

  @ManyToOne((type) => Utilisateur, utilisateur => utilisateur.Messagesrecus)
  recepteur: Utilisateur;
}
