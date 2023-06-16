import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achat } from './entities/achat.entity';
import { CreateAchatDto } from './dto/create-achat.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Produit } from 'src/produit/entities/produit.entity';

@Injectable()
export class AchatService {
  constructor(
    @InjectRepository(Achat)
    private readonly achatRepository: Repository<Achat>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
  ) {}

  async createAchat(createAchatDto: CreateAchatDto): Promise<Achat> {
    const achat = new Achat();

    const { utilisateurId, produitId } = createAchatDto;
    // Retrieve the utilisateur and produit entities based on the provided IDs
    const utilisateur = await this.utilisateurRepository.findOne({ where: { id: utilisateurId }});
    const produit = await this.produitRepository.findOne({ where: { id: produitId }});

    if (!utilisateur || !produit) {
      // Handle if the utilisateur or produit doesn't exist
      throw new Error('Utilisateur or produit not found');
    }

    achat.utilisateur = utilisateur;
    achat.produit = produit;
    achat.montant = produit.prix;

    return this.achatRepository.save(achat);
  }

  async getAchatsByUtilisateur(utilisateurId: number): Promise<{ utilisateur: Utilisateur; achats: Achat[] }> {
    const utilisateur = await this.utilisateurRepository.findOne({ where: { id: utilisateurId } });
    if (!utilisateur) {
      throw new Error('Utilisateur not found');
    }
      
    const achats = await this.achatRepository.find({ where: { id :utilisateurId }, relations: ['produit' , 'produit.utilisateur'] });
  
    return { utilisateur, achats };
  }

  async getAllAchats(): Promise<Achat[]> {
    return this.achatRepository.find({ relations: ['produit', 'utilisateur' , 'produit.utilisateur'] });
  }
  
  
}
