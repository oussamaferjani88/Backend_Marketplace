import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() video: Partial<Video>): Promise<Video> {
    return this.videoService.create(video);
  }

  @Get()
  findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() video: Partial<Video>): Promise<Video> {
    return this.videoService.update(+id, video);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.videoService.remove(+id);
  }
}
