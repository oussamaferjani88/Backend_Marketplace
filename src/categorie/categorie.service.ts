import { Controller, Get, Post, Body, Patch,Put , Param, Delete ,  UploadedFile,  CanActivate, ExecutionContext,
  NotFoundException,BadRequestException  ,Res,Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './entities/categorie.entity';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private  categorieRepository: Repository<Categorie>,

  ) {}
  async findOneName(nomCat: string): Promise<Categorie> {
    return await this.categorieRepository.findOne({where: {nomCat : nomCat}});
  }



  async create(CreateCategorieDto: CreateCategorieDto){
    const catExists = await this.findOneName(CreateCategorieDto.nomCat);
    if (catExists) {
      console.error("Catégorie exist déja !");
    }
    else {
    return  this.categorieRepository.save(CreateCategorieDto);
    }
  }

  async findAll(): Promise<Categorie[]> {
    return await this.categorieRepository.find({ relations: ['boutiques', 'sousCategories' ] });
  }

  async findOne(id: number): Promise<Categorie> {
    return this.categorieRepository.findOne( { where: { id },  relations: [ 'sousCategories' ] });
  }
  



  async update(id: number, updateCategorieDto: UpdateCategorieDto, coverImageFile?: Express.Multer.File): Promise<Categorie> {
    const categorie = await this.categorieRepository.findOne({ where: { id }});
    if (!categorie) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    if (coverImageFile) {
      updateCategorieDto.coverImage = coverImageFile.filename;
    }

    Object.assign(categorie, updateCategorieDto);

    return this.categorieRepository.save(categorie);
  }

  

  async remove(id: number): Promise<void> {
    await this.categorieRepository.delete(id);
  }


  async uploadCoverImage(coverImage: string, id: number) {
    console.log("coverImage :",coverImage);
    return this.categorieRepository.update(id, { coverImage: coverImage });
  }
  
}
