import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Produit } from "src/produit/entities/produit.entity";
import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Categorie } from "src/categorie/entities/categorie.entity";
export class CreateBoutiqueDto {

    readonly nomB: string;
    readonly localisation: string;
    readonly moy_note: number;
    readonly num_tlf: string;
    readonly utilisateur: Utilisateur;
    readonly produits: Produit[];
    readonly evaluations: Evaluation[];
    readonly categorie: Categorie;
}
