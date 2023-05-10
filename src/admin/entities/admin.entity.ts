import {Entity , Column , PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Admin {
 

    @PrimaryGeneratedColumn()
    id : number ; 

    @Column()
    username : string ; 


    @Column()
    email : string ; 

    @Column()
    password : string ; 

}