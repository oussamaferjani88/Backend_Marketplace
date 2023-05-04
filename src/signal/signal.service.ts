import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal } from './entities/signal.entity';

@Injectable()
export class SignalService {
  constructor(
    @InjectRepository(Signal)
    private readonly signalRepository: Repository<Signal>,
  ) {}

  async findAll(): Promise<Signal[]> {
    return await this.signalRepository.find();
  }

  async findOne(id: number): Promise<Signal> {
    return await this.signalRepository.findOne({where : {id}});
  }

  async create(signal: Partial<Signal>): Promise<Signal> {
    return await this.signalRepository.save(signal);
  }

  async update(id: number, signal: Partial<Signal>): Promise<Signal> {
    await this.signalRepository.update(id, signal);
    return await this.signalRepository.findOne({where : {id}});
  }

  async remove(id: number): Promise<void> {
    await this.signalRepository.delete(id);
  }
}
