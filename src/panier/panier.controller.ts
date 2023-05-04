import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Panier } from './entities/panier.entity';
import { PanierService } from './panier.service';

@Controller('panier')
export class PanierController {

  constructor(private panierService: PanierService) {}

  @Post()
  async create(@Body() panier: Partial<Panier>): Promise<Panier> {
    return await this.panierService.create(panier);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Panier> {
    return await this.panierService.findById(Number(id));
  }

  @Get()
  async findAll(): Promise<Panier[]> {
    return await this.panierService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() panier: Partial<Panier>): Promise<Panier> {
    return await this.panierService.update(Number(id), panier);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.panierService.delete(Number(id));
  }

}

