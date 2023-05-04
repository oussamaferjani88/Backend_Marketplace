import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Categorie } from './entities/categorie.entity';
import { CategorieService } from './categorie.service';
import { Produit } from 'src/produit/entities/produit.entity';
@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  async create(@Body() categorie: Categorie): Promise<Categorie> {
    return await this.categorieService.create(categorie);
  }

  @Get()
  async findAll(): Promise<Categorie[]> {
    return await this.categorieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Categorie> {
    return await this.categorieService.findOne(parseInt(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() categorie: Categorie): Promise<Categorie> {
    return await this.categorieService.update(parseInt(id), categorie);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categorieService.remove(parseInt(id));
  }

 


}
