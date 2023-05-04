import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
@Module({
  imports : [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService ,
  {
    provide : "VideoRepository",
    useClass : Repository<Video>,
  },
  
  ],
})
export class VideoModule {}
