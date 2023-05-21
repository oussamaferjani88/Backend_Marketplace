import { PartialType } from '@nestjs/mapped-types';
import { ProduitDto } from './produit.dto';

export class UpdateProduitDto extends PartialType(ProduitDto) {}
