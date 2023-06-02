import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProduitDto } from './dto/produit.dto';
import { VideoDto } from '../video/dto/video.dto';
import { ImageDto } from '../image/dto/image.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';
import { Video } from '../video/entities/video.entity';
import { Image } from '../image/entities/image.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(produitDto: ProduitDto): Promise<Produit> {
    const currentDate = new Date();
    const produit = this.produitRepository.create({
      ...produitDto,
      date_p: currentDate,
      vendue: false,
    });

    return this.produitRepository.save(produit);
  }

  async findAll(): Promise<Produit[]> {
    return await this.produitRepository.find({
      relations: [
        'boutiques',
        'sousCategorie',
        'images',
        'videos',
      ],
    });
  }

  async findOneId(produitId: number): Promise<Produit> {
    return await this.produitRepository.findOne({
      where: { id: produitId },
      relations: ['boutiques', 'sousCategorie', 'images', 'videos'],
    });
  }

  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
  ): Promise<Produit> {
    await this.produitRepository.update(id, updateProduitDto);
    return await this.produitRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.produitRepository.delete(id);
  }

  async uploadImages(imageDto: ImageDto, produitId: number) {
    const produit = await this.findOneId(produitId);
    console.log('produit = ' + JSON.stringify(produit));

    // Initialize images array
    if (produit.images.length == 0) produit.images = [];

    let createdImage = await this.imageRepository.create(imageDto);
    produit.images.push(createdImage);

    return await this.produitRepository.save(produit);
  }

  async uploadVideos(videoDto: VideoDto, produitId: number) {
    const produit = await this.findOneId(produitId);
    if (produit.videos.length == 0) produit.videos = [];

    // Create video based on the VideoDto
    const createdVideo = this.videoRepository.create(videoDto);
    console.log('createdVideo : ', createdVideo);
    // Add created video to the videos array of produit
    produit.videos.push(createdVideo);
    console.log('produit', produit);
    // Save updated produit with the added video
    return await this.produitRepository.save(produit);
  }

  async findProduitByCategorie(categorieId: number): Promise<Produit[]> {
    return await this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.boutiques', 'boutique')
      .leftJoinAndSelect('produit.sousCategorie', 'sousCategorie')
      .leftJoinAndSelect('souCategorie.categorie', 'categorie')
      .where('categorie.id = :id', { id: categorieId })
      .getMany();
  }

  async findProduitBySousCategorie(
    sousCategorieId: number,
  ): Promise<Produit[]> {
    return this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.SousCategorie', 'sousCategorie')
      .where('sousCategorie.id = :id', { id: sousCategorieId })
      .getMany();
  }

  async findProduitByUtilisateur(userId: number): Promise<Produit[]> {
    return this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.utilisateur', 'utilisateur')
      .where('utilisateur.id = :id', { id: userId })
      .getMany();
  }

  async findProduitByName(name: string): Promise<Produit[]> {
    return this.produitRepository
      .createQueryBuilder('produit')
      .where('produit.nomP ILIKE :name', { name: `%${name}%` })
      .getMany();
  }



  async getProductImages(id: number): Promise<Image[]> {
    const produit = await this.produitRepository.findOne({where : {id}});
    if (!produit) {
      // Handle the case where the product is not found
      // For example, throw an exception or return an error message
    }
    return produit.images;
  }


  async getProductVideos(id: number): Promise<Video[]> {
    const produit = await this.produitRepository.findOne({where : {id}});
    if (!produit) {
      console.log(`Produit with ID ${id} not found`);
    }
    return produit.videos;
  }




}
