import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boutique } from './entities/boutique.entity';

@Injectable()
export class BoutiqueService {
  constructor(
    @InjectRepository(Boutique)
    private readonly boutiqueRepository: Repository<Boutique>,
  ) {}

  async createBoutique(data: Partial<Boutique>): Promise<Boutique> {
    return await this.boutiqueRepository.save(data);
  }

  async getBoutiqueById(id: number): Promise<Boutique> {
    return await this.boutiqueRepository.findOne(  { where  : {id},
      relations: ['produits', 'evaluations', 'categorie'],
    });
  }

  async updateBoutiqueById(id: number, data: Partial<Boutique>): Promise<Boutique> {
    await this.boutiqueRepository.update(id, data);
    return await this.getBoutiqueById(id);
  }

  async deleteBoutiqueById(id: number): Promise<void> {
    await this.boutiqueRepository.delete(id);
  }
}
