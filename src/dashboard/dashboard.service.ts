import { Injectable } from '@nestjs/common';
import { Produit } from 'src/produit/entities/produit.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(Produit)
        private prodRep: Repository<Produit>,
        @InjectRepository(Utilisateur)
        private userRep: Repository<Utilisateur>,
        @InjectRepository(Categorie)
        private catRep: Repository<Categorie>,
      ) {}
    
      async getCountProd() {
        return await this.prodRep.count();
      }
    
      async getTotalUsers() {
        return await this.userRep.count();
      }
    
      async getMostProductsCategory() {
        //retrieve the categories with subcategories and products
        const categories: Categorie[] = await this.catRep.find({
          relations: ['sousCategories', 'sousCategories.produits'],
        });
    
        const categoryCounts = categories.reduce((counts, categorie) => {
          const { nomCat, sousCategories } = categorie;
          let categorieProduitCount = 0;
    
          //calculate number of products in each category:
          sousCategories.forEach((sousCat) => {
            categorieProduitCount += sousCat.produits.length;
          });
    
          counts.set(nomCat, categorieProduitCount);
          return counts;
        }, new Map<string, number>());
    
        let maxCategorie: string;
        let maxCount = 0;
        categoryCounts.forEach((count, categorie) => {
          if (count > maxCount) {
            maxCount = count;
            maxCategorie = categorie;
          }
        });
        return { nomCat: maxCategorie, nombreProduits: maxCount };
      }

}
