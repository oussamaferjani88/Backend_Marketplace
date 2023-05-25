import { PartialType } from '@nestjs/mapped-types';
import { VideoDto } from './video.dto';

export class UpdateVideoDto extends PartialType(VideoDto) {}
