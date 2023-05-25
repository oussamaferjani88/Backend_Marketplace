import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImageDto } from './dto/image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(image: ImageDto): Promise<Image> {
    return await this.imageRepository.save(image);
  }

  async findImagesByProduitId(imageId: number): Promise<Image[]> {
    return this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.produit', 'produit')
      .where('produit.id = :id', { id : imageId })
      .getMany();
  }

  async update(id: number, image: Partial<Image>): Promise<Image> {
    await this.imageRepository.update(id, image);
    return this.imageRepository.findOne({where : {id}});
  }

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    return await this.imageRepository.findOne({where : {id}});
  }

  async remove(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
