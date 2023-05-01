import { Produit } from "src/produit/entities/produit.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Video {

@PrimaryGeneratedColumn()
id : number ; 


@Column()
nom_video : string ; 

@ManyToOne((type) => Produit, (produit) => produit.videos)
    produit: Produit;

}
