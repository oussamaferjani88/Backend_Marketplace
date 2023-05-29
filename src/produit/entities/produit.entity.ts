import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Boutique } from 'src/boutique/entities/boutique.entity';
import { Image } from 'src/image/entities/image.entity';
import { Signal } from 'src/signal/entities/signal.entity';
import { SousCategorie } from 'src/sous-categorie/entities/sous-categorie.entity';
import { Video } from 'src/video/entities/video.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomP: string;

  @Column()
  prix: number;

  @Column()
  description: string;

  @Column()
  date_p: Date;

  @Column()
  vendue: boolean;

  @Column({ nullable: true })
  date_v: Date;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.produits)
  utilisateur: Utilisateur;

  @ManyToOne(
    (type) => SousCategorie,
    (sousCategorie) => sousCategorie.produits /*, { nullable: true }*/,
  )
  sousCategorie: SousCategorie;

  @ManyToMany(() => Boutique, (boutique) => boutique.produits)
  @JoinTable()
  boutiques: Boutique[];

  @OneToMany(() => Signal, (signal) => signal.produit /*, { nullable: true }*/)
  signals: Signal[];

  @OneToMany(() => Image, (image) => image.produit, { cascade: true })
  images: Image[];

  @OneToMany(() => Video, (video) => video.produit, { cascade: true })
  videos: Video[];
}
