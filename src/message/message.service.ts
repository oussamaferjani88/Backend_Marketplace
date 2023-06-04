import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Utilisateur)
    private userRepository: Repository<Utilisateur>,
  ) {}

  async create(message: CreateMessageDto): Promise<Message> {
    const expediteur = await this.userRepository.findOne({
      where: { id: message.expdId },
    });
    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async update(id: number, message: Partial<Message>): Promise<Message> {
    await this.messageRepository.update(id, message);
    return await this.messageRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
