import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SousCategorie } from './entities/sous-categorie.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { UpdateSousCategorieDto } from './dto/update-sous-categorie.dto';
@Injectable()
export class SousCategorieService {
  constructor(
    @InjectRepository(SousCategorie)
    private readonly sousCategorieRepository: Repository<SousCategorie>,
  ) {}

  async findOneName(nomSc: string): Promise<SousCategorie> {
    return await this.sousCategorieRepository.findOne({
      where: { nomSc: nomSc },
    });
  }

  async create(sousCategorie: SousCategorie): Promise<SousCategorie> {
    const sousCatExists = await this.findOneName(sousCategorie.nomSc);
    if (sousCatExists) {
      console.error('Sous Catégorie exist déja !');
    } else {
      return await this.sousCategorieRepository.save(sousCategorie);
    }
  }

  async findAll(): Promise<SousCategorie[]> {
    return await this.sousCategorieRepository.find({ relations: ['produits'] });
  }

  async findProduitsBySousCategorie(
    sousCategorieId: number,
  ): Promise<Produit[]> {
    return await this.sousCategorieRepository
      .createQueryBuilder('sousCategorie')
      .leftJoinAndSelect('sousCategorie.produits', 'produit')
      .where('sousCategorie.id = :id', { id: sousCategorieId })
      .getMany()
      .then((sousCategorie: SousCategorie[]) => sousCategorie[0].produits);
  }

  async findOne(id: number): Promise<SousCategorie> {
    return await this.sousCategorieRepository.findOne({ where: { id: id } , relations: ['categorie'] });
  }

  async update(
    id: number,
    sousCategorieDto: UpdateSousCategorieDto,
  ): Promise<SousCategorie> {
    const { nomSc } = sousCategorieDto;
    const sousCategorie = await this.sousCategorieRepository.findOne({ where: { id: id }});
    if (!sousCategorie) {
      throw new NotFoundException('Sous Catégorie not found');
    }
    sousCategorie.nomSc = nomSc;
    return await this.sousCategorieRepository.save(sousCategorie);
  }




  async remove(id: number): Promise<void> {
    await this.sousCategorieRepository.delete(id);
  }

  
  async findSousCategoriesByCategorie(
    categorieId: number,
  ): Promise<SousCategorie[]> {
    return await this.sousCategorieRepository.find({
      where: { categorie: { id: categorieId } },
      relations: ['produits'],
    });
  }
}
