import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SousCategorieService } from './sous-categorie.service';
import { CreateSousCategorieDto } from './dto/create-sous-categorie.dto';
import { UpdateSousCategorieDto } from './dto/update-sous-categorie.dto';

@Controller('sous-categorie')
export class SousCategorieController {
  constructor(private readonly sousCategorieService: SousCategorieService) {}

  @Post()
  create(@Body() createSousCategorieDto: CreateSousCategorieDto) {
    return this.sousCategorieService.create(createSousCategorieDto);
  }

  @Get()
  findAll() {
    return this.sousCategorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sousCategorieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSousCategorieDto: UpdateSousCategorieDto) {
    return this.sousCategorieService.update(+id, updateSousCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sousCategorieService.remove(+id);
  }
}
