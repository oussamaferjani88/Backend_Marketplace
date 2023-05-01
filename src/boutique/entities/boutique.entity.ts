import { Categorie } from "src/categorie/entities/categorie.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Produit } from "src/produit/entities/produit.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"


@Entity()
export class Boutique {

    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    nomB : string ; 

    @Column()
    localisation : string ; 

    @Column()
    moy_note : number ;

    @Column()
    num_tlf : string ;


 @ManyToOne((type) => Utilisateur, (utilisateur) => utilisateur.boutiques)
  utilisateur: Utilisateur;



@ManyToMany(() => Produit, produit => produit.boutiques)
produits: Produit[];



@OneToMany(() =>Evaluation , evaluation => evaluation.boutique )
evaluations : Evaluation[];



@ManyToOne((type) => Categorie, (categorie) => categorie.boutiques)
categorie: Categorie;


}
