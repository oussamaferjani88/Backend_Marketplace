import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitDto } from './dto/produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  create(@Body() produitDto: ProduitDto): Promise<Produit> {
    return this.produitService.create(produitDto);
  }

  @Get()
  findAll(): Promise<Produit[]> {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Produit> {
    return this.produitService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProduitDto: UpdateProduitDto): Promise<Produit> {
    return this.produitService.update(id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produitService.remove(id);
  }

  @Get('/bycategorie/:id')
  findProduitByCategorie(@Param('id', ParseIntPipe) categorieId: number): Promise<Produit[]> {
    return this.produitService.findProduitByCategorie(categorieId);
  }
}
