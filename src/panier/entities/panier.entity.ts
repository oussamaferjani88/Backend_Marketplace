import { Produit } from "src/produit/entities/produit.entity";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Panier {

@PrimaryGeneratedColumn()
id : number;    

@Column()
date : Date;

@Column()
note : number;

@ManyToOne((type) => Utilisateur, (utilisateur) => utilisateur.paniers)
  utilisateur: Utilisateur;

@OneToOne((type) => Produit , (produit) => produit.panier )
produit  : Produit ; 


}
