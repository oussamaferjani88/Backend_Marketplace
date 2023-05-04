import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panier } from './entities/panier.entity';

@Injectable()
export class PanierService {

  constructor(
    @InjectRepository(Panier) private panierRepository: Repository<Panier>
  ) {}

  async create(panier: Partial<Panier>): Promise<Panier> {
    return await this.panierRepository.save(panier);
  }

  async findById(id: number): Promise<Panier> {
    return await this.panierRepository.findOne({where : {id}});
  }

  async findAll(): Promise<Panier[]> {
    return await this.panierRepository.find();
  }

  async update(id: number, panier: Partial<Panier>): Promise<Panier> {
    await this.panierRepository.update(id, panier);
    return await this.panierRepository.findOne({where : {id}});
  }

  async delete(id: number): Promise<void> {
    await this.panierRepository.delete(id);
  }

}

