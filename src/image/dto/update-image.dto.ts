import { PartialType } from '@nestjs/mapped-types';
import { ImageDto } from './image.dto';

export class UpdateImageDto extends PartialType(ImageDto) {}
