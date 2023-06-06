import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async send_message(
    message: MessageDto,
    expediteurId: number,
    recepteurId: number,
  ): Promise<Message> {
    const msg = new Message();

    msg.contenu = message.contenu;
    msg.date_envoi = message.date_envoi;
    msg.is_read = false;

    msg.expediteur = await this.findUserById(expediteurId);
    msg.recepteur = await this.findUserById(recepteurId);

    return this.messageRepository.save(msg);
  }

  private async findUserById(id: number): Promise<Utilisateur> {
    return await this.utilisateurRepository.findOne({ where: { id } });
  }

  async get_messages(
    expediteurId: number,
    recepteurId: number,
  ): Promise<Message[]> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .where(
        '(message.expediteurId = :expediteur AND message.recepteurId = :recepteur) OR (message.expediteurId = :recepteur AND message.recepteurId = :expediteur)',
        { expediteur : expediteurId , recepteur : recepteurId },
      )
      .orderBy('message.date_envoi', 'ASC');

    console.log('Query:', query.getSql());

    const result = await query.getMany();

    return result;
  }

  async mark_Read(expediteurId: number, recepteurId: number): Promise<void> {
    await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ is_read: true })
      .where(
        '(expediteurId = :expediteur AND recepteurId = :recepteur)',
        { expediteur : expediteurId, recepteur : recepteurId },
      )
      .execute();
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOneId(id: number): Promise<Message> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async update(id: number, message: MessageDto): Promise<Message> {
    await this.messageRepository.update(id, message);
    return await this.messageRepository.findOne({ where: { id } });
  }

  async remove_message(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
