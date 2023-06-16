import { Body, Controller, Delete, Get, Param, Post, Put , Patch} from '@nestjs/common';
import { SousCategorie } from './entities/sous-categorie.entity';
import { SousCategorieService } from './sous-categorie.service';
import { Produit } from 'src/produit/entities/produit.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSousCategorieDto } from './dto/update-sous-categorie.dto';
@Controller('sous-categories')
export class SousCategorieController {
  constructor(
    private readonly sousCategorieService: SousCategorieService,
    @InjectRepository(Categorie)
    private readonly categorieRepository: Repository<Categorie>,
  ) {}

  @Post()
  async create(@Body() sousCategorie: SousCategorie): Promise<SousCategorie> {
    return await this.sousCategorieService.create(sousCategorie);
  }

  @Get(':id/produits')
  async findProduitsBySousCategorie(@Param('id') id: string): Promise<Produit[]> {
    return await this.sousCategorieService.findProduitsBySousCategorie(parseInt(id));
  }

  @Get()
  async findAll(): Promise<SousCategorie[]> {
    return await this.sousCategorieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SousCategorie> {
    return await this.sousCategorieService.findOne(parseInt(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() sousCategorieDto: UpdateSousCategorieDto,
  ): Promise<SousCategorie> {
    return this.sousCategorieService.update(id, sousCategorieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.sousCategorieService.remove(parseInt(id));
  }



  @Get('categorie/:categorieId')
  async findSousCategoriesByCategorie(@Param('categorieId') categorieId: string): Promise<SousCategorie[]> {
    return await this.sousCategorieService.findSousCategoriesByCategorie(parseInt(categorieId));
  }

 
   @Post('categorie/:categorieId')
  async createWithCategorie(
    @Param('categorieId') categorieId: string,
    @Body() sousCategorie: SousCategorie,
  ): Promise<SousCategorie> {
    console.log('categorieId:', categorieId); // Log the value of categorieId

    const parsedCategorieId: number = parseInt(categorieId);
    console.log('parsedCategorieId:', parsedCategorieId); // Log the parsed value

    const categorie: Categorie = await this.categorieRepository.findOne({ where: { id: parsedCategorieId } });
    console.log('categorie:', categorie); // Log the retrieved categorie

    if (!categorie) {
      // Handle error if the categorieId does not exist
      throw new Error('Invalid categorieId');
    }

    sousCategorie.categorie = categorie;

    return await this.sousCategorieService.create(sousCategorie);
  }


}
