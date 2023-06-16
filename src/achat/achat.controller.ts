import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AchatService } from './achat.service';
import { CreateAchatDto } from './dto/create-achat.dto';
import { Achat } from './entities/achat.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
@Controller('achats')
export class AchatController {
  constructor(private readonly achatService: AchatService) {}

  @Post()
  async createAchat(@Body() createAchatDto: CreateAchatDto): Promise<Achat> {
    return this.achatService.createAchat(createAchatDto);
  }

  @Get(':utilisateurId')
  async getAchatsByUtilisateur(
    @Param('utilisateurId') utilisateurId: number,
  ): Promise<{ utilisateur: Utilisateur; achats: Achat[] }> {
    return this.achatService.getAchatsByUtilisateur(utilisateurId);
  }

// In the AchatController

// In the AchatController

@Get()
async getAllAchats(): Promise<Achat[]> {
  return this.achatService.getAllAchats();
}

  
  
}
