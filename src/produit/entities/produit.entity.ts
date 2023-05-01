import { Boutique } from "src/boutique/entities/boutique.entity";
import { Image } from "src/image/entities/image.entity";
import { Panier } from "src/panier/entities/panier.entity";
import { Signal } from "src/signal/entities/signal.entity";
import { SousCategorie } from "src/sous-categorie/entities/sous-categorie.entity";
import { Video } from "src/video/entities/video.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne , JoinTable } from "typeorm"

@Entity()
export class Produit {

    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    nomP : string;

    @Column()
    prix : number ; 

    @Column()
    description : string;

    @Column()
    date_p: Date ; 

    @Column()
    vendue : boolean;

    @Column()
    date_v : Date ;


    @ManyToMany(() => Boutique, boutique => boutique.produits)
    @JoinTable()
    boutiques: Boutique[];


@ManyToOne((type) => SousCategorie, (sousCategorie) => sousCategorie.produits)
sousCategorie: SousCategorie;

@OneToOne((type) => Panier , panier => panier.produit)
panier : Panier;

@OneToMany(() => Signal , signal =>signal.produit )
signals : Signal[];


@OneToMany(() => Image , image =>image.produit )
images : Image[];

@OneToMany(() => Video , video =>video.produit )
videos : Video[];
}
