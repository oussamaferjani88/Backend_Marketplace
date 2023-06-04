import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  date_envoi: Date;

  @ManyToOne(
    (type) => Utilisateur,
    (utilisateur) => utilisateur.messagesEnvoyer,
  )
  expediteur: Utilisateur;

  @ManyToOne((type) => Utilisateur, (utilisateur) => utilisateur.messagesRecus)
  recepteur: Utilisateur;
}
