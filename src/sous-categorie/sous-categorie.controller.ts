import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SousCategorie } from './entities/sous-categorie.entity';
import { SousCategorieService } from './sous-categorie.service';
import { Produit } from 'src/produit/entities/produit.entity';
@Controller('sous-categories')
export class SousCategorieController {
  constructor(private readonly sousCategorieService: SousCategorieService) {}

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() sousCategorie: SousCategorie,
  ): Promise<SousCategorie> {
    return await this.sousCategorieService.update(parseInt(id), sousCategorie);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.sousCategorieService.remove(parseInt(id));
  }
}
