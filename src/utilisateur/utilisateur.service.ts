import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}
  

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOne(id: number): Promise<Utilisateur> {
    return this.utilisateurRepository.findOne({where : {id}});
  }

  // async create(utilisateur: Partial<Utilisateur>): Promise<Utilisateur> {
  //   return this.utilisateurRepository.save(utilisateur);
  // }


  async create(utilisateur: CreateUtilisateurDto): Promise<Utilisateur> {
    console.log('creating utilisateur:', utilisateur);
    try {
      const newUtilisateur = this.utilisateurRepository.create(utilisateur);
      console.log('new utilisateur:', newUtilisateur);
      const createdUtilisateur = await this.utilisateurRepository.save(newUtilisateur);
      console.log('created utilisateur:', createdUtilisateur);
      return createdUtilisateur;
    } catch (error) {
      console.error('error creating utilisateur:', error);
      throw error;
    }
  }

  async update(
    id: number,
    utilisateur: Partial<Utilisateur>,
  ): Promise<Utilisateur> {
    await this.utilisateurRepository.update(id, utilisateur);
    return this.utilisateurRepository.findOne({where : {id}});
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}
