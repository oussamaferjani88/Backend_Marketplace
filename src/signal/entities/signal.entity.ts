import { Produit } from "src/produit/entities/produit.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Signal {


    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    raison : string;

    @ManyToOne((type) => Utilisateur, (utilisateur) => utilisateur.signals)
  utilisateur: Utilisateur;

  @ManyToOne((type) => Produit, (produit) => produit.signals)
  produit: Produit;

}
