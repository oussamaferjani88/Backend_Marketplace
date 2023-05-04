import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  async create(evaluation: Partial<Evaluation>): Promise<Evaluation> {
    return await this.evaluationRepository.save(evaluation);
  }

  async update(id: number, evaluation: Partial<Evaluation>): Promise<Evaluation> {
    await this.evaluationRepository.update(id, evaluation);
    return this.evaluationRepository.findOne({where : {id}});
  }

  async findAll(): Promise<Evaluation[]> {
    return await this.evaluationRepository.find();
  }

  async findOne(id: number): Promise<Evaluation> {
    return await this.evaluationRepository.findOne({where : {id}});
  }

  async remove(id: number): Promise<void> {
    await this.evaluationRepository.delete(id);
  }
}
