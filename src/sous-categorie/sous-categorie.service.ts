import { Injectable } from '@nestjs/common';
import { CreateSousCategorieDto } from './dto/create-sous-categorie.dto';
import { UpdateSousCategorieDto } from './dto/update-sous-categorie.dto';

@Injectable()
export class SousCategorieService {
  create(createSousCategorieDto: CreateSousCategorieDto) {
    return 'This action adds a new sousCategorie';
  }

  findAll() {
    return `This action returns all sousCategorie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sousCategorie`;
  }

  update(id: number, updateSousCategorieDto: UpdateSousCategorieDto) {
    return `This action updates a #${id} sousCategorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} sousCategorie`;
  }
}
