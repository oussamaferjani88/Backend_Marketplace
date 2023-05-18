import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { UtilisateurDto } from './dto/utilisateur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private readonly jwtService: JwtService
  ) { }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOneId(id: number): Promise<Utilisateur> {
    return this.utilisateurRepository.findOne({ where: { id } });
  }

  async findOneEmail(email: string): Promise<Utilisateur> {
    return this.utilisateurRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<Utilisateur | undefined> {

    const user = await this.findOneEmail(email);
    if (user && (await bcrypt.compare(password, user.mdp))) {
      return user;
    }
    return null;
  }

  async create(utilisateur: UtilisateurDto): Promise<Utilisateur> {
    //console.log('creating utilisateur:', utilisateur);
    const existingUser = await this.findOneEmail(utilisateur.email);
    if (existingUser) {
      throw new Error('User with that email already exists');
    }
    else {
      try {
        const payload = { email : utilisateur.email};
        const token = this.jwtService.signAsync(payload)
        const hashedPassword = await bcrypt.hash(utilisateur.mdp, 10);
        const newUser = this.utilisateurRepository.create({
          ...utilisateur,
          mdp: hashedPassword,
          
        });
        //console.log('new utilisateur :', newUser);
        return await this.utilisateurRepository.save(newUser);
      } catch (error) {
        console.error('error creating utilisateur :', error);
        throw error;
      }
    }
  }

  async update(id: number, utilisateur: Partial<Utilisateur>,): Promise<Utilisateur> {
    await this.utilisateurRepository.update(id, utilisateur);
    return this.utilisateurRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}
