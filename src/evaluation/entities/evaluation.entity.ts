import { Boutique } from "src/boutique/entities/boutique.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Evaluation {
@PrimaryGeneratedColumn()
id : number;

@Column()
description : string;

@Column()
note : number;


@ManyToOne((type) => Utilisateur, (utilisateur) => utilisateur.evaluations)
  utilisateur: Utilisateur;

  @ManyToOne((type) => Boutique, (boutique) => boutique.evaluations)
  boutique: Boutique;

}
