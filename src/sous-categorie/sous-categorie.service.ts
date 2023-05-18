import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SousCategorie } from './entities/sous-categorie.entity';
import { Produit } from 'src/produit/entities/produit.entity';
@Injectable()
export class SousCategorieService {
  constructor(
    @InjectRepository(SousCategorie)
    private readonly sousCategorieRepository: Repository<SousCategorie>,
  ) {}

  async findOneName(nomSc: string): Promise<SousCategorie> {
    return await this.sousCategorieRepository.findOne({where: {nomSc : nomSc}});
  }

  async create(sousCategorie: SousCategorie): Promise<SousCategorie> {
    const sousCatExists = await this.findOneName(sousCategorie.nomSc);
    if (sousCatExists) {
      console.error("Sous Catégorie exist déja !");
    }
    else {
    return await this.sousCategorieRepository.save(sousCategorie);
    }
  }

  async findAll(): Promise<SousCategorie[]> {
    return await this.sousCategorieRepository.find({ relations: ['produits'] });
  }

  async findProduitsBySousCategorie(sousCategorieId: number): Promise<Produit[]> {
    return await this.sousCategorieRepository
      .createQueryBuilder('sousCategorie')
      .leftJoinAndSelect('sousCategorie.produits', 'produit')
      .where('sousCategorie.id = :id', { id: sousCategorieId })
      .getMany()
      .then((sousCategorie: SousCategorie[]) => sousCategorie[0].produits);
  }
  
  

  async findOne(id: number): Promise<SousCategorie> {
    return await this.sousCategorieRepository.findOne({where: {id: id, }});
  }

  async update(id: number, sousCategorie: SousCategorie): Promise<SousCategorie> {
    await this.sousCategorieRepository.update(id, sousCategorie);
    return await this.sousCategorieRepository.findOne({where: {id: id, }});
  }

  async remove(id: number): Promise<void> {
    await this.sousCategorieRepository.delete(id);
  }
  async findSousCategoriesByCategorie(categorieId: number): Promise<SousCategorie[]> {
    return await this.sousCategorieRepository.find({ where: { categorie: { id: categorieId } }, relations: ['produits'] });
  }
  
}
