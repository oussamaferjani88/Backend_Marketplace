import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './entities/utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Utilisateur> {
    return this.utilisateurService.findOne(id);
  }

 
  @Post()
  async create(@Body() utilisateur: CreateUtilisateurDto): Promise<Utilisateur> {
    console.log('creating utilisateur:', utilisateur);
    try {
      const createdUtilisateur = await this.utilisateurService.create(utilisateur);
      console.log('created utilisateur:', createdUtilisateur);
      return createdUtilisateur;
    } catch (error) {
      console.error('error creating utilisateur:', error);
      throw error;
    }
  }


  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() utilisateur: Partial<Utilisateur>,
  ): Promise<Utilisateur> {
    return this.utilisateurService.update(id, utilisateur);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.utilisateurService.remove(id);
  }
}
