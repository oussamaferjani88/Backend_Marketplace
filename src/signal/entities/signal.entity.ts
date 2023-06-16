import { Produit } from "src/produit/entities/produit.entity";

import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Signal {


    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    content : string;


  @ManyToOne((type) => Produit, (produit) => produit.signals)
  produit: Produit;

}
