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
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}


  async create(produitDto: ProduitDto){
    const currentDate = new Date();
    const utilisateur  = await this.utilisateurRepository.findOne({where : { id :produitDto.utilisateurId}})
    const {utilisateurId , ...rest } = produitDto ;
    const produit = this.produitRepository.create(rest );
    produit.utilisateur = utilisateur;
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
      relations: ['boutiques', 'sousCategorie', 'images', 'videos' , 'utilisateur' ],
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

  async findProduitByCategorie(
    categorieId: number,
    minPrice: number,
    maxPrice: number
  ): Promise<Produit[]> {
    return await this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.boutiques', 'boutique')
      .leftJoinAndSelect('produit.images', 'images')
      .leftJoinAndSelect('produit.videos', 'videos')
      .leftJoinAndSelect('produit.sousCategorie', 'sousCategorie')
      .leftJoinAndSelect('sousCategorie.categorie', 'categorie')
      .where('categorie.id = :id', { id: categorieId })
      .andWhere('produit.prix >= :minPrice', { minPrice })
      .andWhere('produit.prix <= :maxPrice', { maxPrice })
      .getMany();
  }
  
  async findProduitBySousCategorie(
    sousCategorieId: number,
    minPrice: number,
    maxPrice: number
  ): Promise<Produit[]> {
    return this.produitRepository
      .createQueryBuilder('produit')
      .leftJoinAndSelect('produit.SousCategorie', 'sousCategorie')
      .where('sousCategorie.id = :id', { id: sousCategorieId })
      .andWhere('produit.prix >= :minPrice', { minPrice })
      .andWhere('produit.prix <= :maxPrice', { maxPrice })
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

  async removeImage(imageId: number): Promise<void> {
    await this.imageRepository.delete(imageId);
  }
  
  async removeVideo(videoId: number): Promise<void> {
    await this.videoRepository.delete(videoId);
  }
  

  async searchProducts(query: string): Promise<Produit[]> {
    const products = await this.produitRepository.createQueryBuilder('produit')
      .where('LOWER(produit.nomP) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(produit.description) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(produit.localisation) LIKE LOWER(:query)', { query: `%${query}%` })
      .leftJoinAndSelect('produit.sousCategorie', 'sousCategorie')
      .leftJoinAndSelect('produit.images', 'images')
      .leftJoinAndSelect('produit.videos', 'videos')
      .leftJoinAndSelect('produit.utilisateur', 'utilisateur')
      .getMany();
  
    return products;
  }
  
  
}