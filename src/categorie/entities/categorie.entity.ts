import { Boutique } from "src/boutique/entities/boutique.entity";
import { SousCategorie } from "src/sous-categorie/entities/sous-categorie.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"



@Entity()
export class Categorie {

    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    nomCat : string;


    @OneToMany(() =>Boutique ,  boutique => boutique.categorie /*, { nullable: true }*/ )
    boutiques : Boutique[];

    
    @OneToMany(() =>SousCategorie ,  sousCategorie => sousCategorie.categorie )
    sousCategories : SousCategorie[];


}
