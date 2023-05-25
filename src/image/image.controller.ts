import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { ImageDto } from './dto/image.dto';


@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async create(@Body() image: ImageDto): Promise<Image> {
    return await this.imageService.create(image);
  }

  @Get()
  async findAll(): Promise<Image[]> {
    return await this.imageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Image> {
    return await this.imageService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() image: Partial<Image>): Promise<Image> {
    return await this.imageService.update(id, image);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.imageService.remove(id);
  }
}
