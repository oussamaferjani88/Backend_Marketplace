import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    return await this.produitRepository.save(createProduitDto);
  }

  async findAll(): Promise<Produit[]> {
    return await this.produitRepository.find({ relations: ['boutiques', 'sousCategorie', 'categorie', 'images', 'videos'] });
  }

  async findOne(id: number): Promise<Produit> {
    return await this.produitRepository.findOne( { where: { id }, relations: ['boutiques', 'sousCategorie', 'categorie', 'images', 'videos'] });
  }

  async update(id: number, updateProduitDto: UpdateProduitDto): Promise<Produit> {
    await this.produitRepository.update(id, updateProduitDto);
    return await this.produitRepository.findOne({where: {id: id, }});
  }

  async remove(id: number): Promise<void> {
    await this.produitRepository.delete(id);
  }

  async findProduitByCategorie(categorieId: number): Promise<Produit[]> {
    return await this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.boutiques', 'boutique')
      .leftJoinAndSelect('produit.sousCategorie', 'sousCategorie')
      .leftJoinAndSelect('produit.categorie', 'categorie')
      .where('categorie.id = :id', { id: categorieId })
      .getMany();
  }
  
}