import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
@Module({
  imports : [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService,
  {
    provide : 'ImageRepository',
    useClass : Repository<Image>,
  },
  
  ], 
})
export class ImageModule {}
