import { PartialType } from '@nestjs/mapped-types';
import { UtilisateurDto } from './utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(UtilisateurDto) {}
