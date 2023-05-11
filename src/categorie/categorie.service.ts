import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './entities/categorie.entity';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,

  ) {}

  async create(categorie: Partial<Categorie>): Promise<Categorie> {
    return this.categorieRepository.save(categorie);
  }

  async findAll(): Promise<Categorie[]> {
    return await this.categorieRepository.find({ relations: ['boutiques', 'sousCategories' , 'produits'] });
  }

  async findOne(id: number): Promise<Categorie> {
    return await this.categorieRepository.findOne( { where: { id },  relations: ['boutiques', 'sousCategories' , 'produits'] });
  }
  
  

  async update(id: number, categorie: Categorie): Promise<Categorie> {
    await this.categorieRepository.update(id, categorie);
    return await this.categorieRepository.findOne({where: {id: id, }});
  }

  async remove(id: number): Promise<void> {
    await this.categorieRepository.delete(id);
  }

 


}
