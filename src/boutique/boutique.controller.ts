import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { Boutique } from './entities/boutique.entity';

@Controller('boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post()
  async createBoutique(@Body() data: Partial<Boutique>): Promise<Boutique> {
    return await this.boutiqueService.createBoutique(data);
  }

  @Get(':id')
  async getBoutiqueById(@Param('id') id: number): Promise<Boutique> {
    return await this.boutiqueService.getBoutiqueById(id);
  }

  @Put(':id')
  async updateBoutiqueById(
    @Param('id') id: number,
    @Body() data: Partial<Boutique>,
  ): Promise<Boutique> {
    return await this.boutiqueService.updateBoutiqueById(id, data);
  }

  @Delete(':id')
  async deleteBoutiqueById(@Param('id') id: number): Promise<void> {
    await this.boutiqueService.deleteBoutiqueById(id);
  }
}
