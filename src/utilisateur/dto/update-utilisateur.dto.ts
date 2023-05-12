import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {}
