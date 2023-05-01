import { Categorie } from "src/categorie/entities/categorie.entity";
import { Produit } from "src/produit/entities/produit.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"


@Entity()
export class SousCategorie {

@PrimaryGeneratedColumn()
id : number ; 


@Column()
nomSc : string;


@OneToMany((type) => Produit, (produit) => produit.sousCategorie)
produits: Produit[];
  
@ManyToOne((type) => Categorie, (categorie) => categorie.sousCategories)
categorie: Categorie;

}
