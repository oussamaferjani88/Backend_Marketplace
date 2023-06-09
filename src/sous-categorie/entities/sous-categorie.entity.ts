import { Categorie } from "src/categorie/entities/categorie.entity";
import { Produit } from "src/produit/entities/produit.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne , JoinColumn } from "typeorm"


@Entity()
export class SousCategorie {

@PrimaryGeneratedColumn()
id : number ; 


@Column()
nomSc : string;


@OneToMany((type) => Produit, (produit) => produit.sousCategorie  /*, { nullable: true }*/ , {onDelete : "CASCADE"}     )
produits: Produit[];

  
@ManyToOne((type) => Categorie, (categorie) => categorie.sousCategories)
@JoinColumn({ name: 'categorieId' }) // Add this line
categorie: Categorie;

}
