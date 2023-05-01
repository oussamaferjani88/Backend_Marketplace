import { Boutique } from "src/boutique/entities/boutique.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Message } from "src/message/entities/message.entity";
import { Panier } from "src/panier/entities/panier.entity";
import { Signal } from "src/signal/entities/signal.entity";
import {Entity , Column , PrimaryGeneratedColumn , ManyToMany ,OneToMany , ManyToOne , OneToOne } from "typeorm"

@Entity()
export class Utilisateur {


    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    nom : string ; 


    @Column()
    email : string ; 

    @Column()
    motdepasse : string ; 

    @Column()
    num_tlf : string ; 

    @Column()
    localisation : string ; 

    @Column()
    pdp : string ; 

    @Column() 
    est_interdit : boolean ;

    @Column()
    note : number ;
    
   @OneToMany((type) => Evaluation, (evaluation) => evaluation.utilisateur)
   evaluations: Evaluation[];


  @OneToMany((type) => Boutique, (boutique) => boutique.utilisateur)
  boutiques: Boutique[];


  @OneToMany((type) => Signal, (signal) => signal.utilisateur)
  signals: Signal[];


  @OneToMany((type) => Panier, (panier) => panier.utilisateur)
  paniers: Evaluation[];

  @OneToMany((type) => Message, message => message.expediteur)
  Messagesenvoyer : Message[];

  @OneToMany((type) => Message, message => message.recepteur)
  Messagesrecus: Message[];



}
