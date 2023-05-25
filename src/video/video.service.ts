import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { VideoDto } from './dto/video.dto';


@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) 
    private videoRepository: Repository<Video>,
  ) {}

  async create(video: VideoDto): Promise<Video> {
    return this.videoRepository.save(video);
  }

  async findVideosByProduitId(produitId: number): Promise<Video[]> {
    return this.videoRepository
      .createQueryBuilder('video')
      .leftJoinAndSelect('video.produit', 'produit')
      .where('produit.id = :id', { id : produitId })
      .getMany();
  }

  async update(id: number, video: Partial<Video>): Promise<Video> {
    await this.videoRepository.update(id, video);
    return this.videoRepository.findOne({where : {id}});
  }

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find();
  }

  async findOne(id: number): Promise<Video> {
    return this.videoRepository.findOne({where : {id}});
  }

  async remove(id: number): Promise<void> {
    await this.videoRepository.delete(id);
  }
}
