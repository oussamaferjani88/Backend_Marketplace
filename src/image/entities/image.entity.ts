import { Produit } from "src/produit/entities/produit.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id : number ; 


    @Column()
    nom_image : string;



    @ManyToOne((type) => Produit, (produit) => produit.images)
    produit: Produit;

}
