import { PartialType } from '@nestjs/mapped-types';
import { CreateKeywordMatchingDto } from './create-keyword-matching.dto';

export class UpdateKeywordMatchingDto extends PartialType(CreateKeywordMatchingDto) {}
