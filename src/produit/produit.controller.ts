import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  Header,
  Injectable,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ProduitService } from './produit.service';
import { ProduitDto } from './dto/produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';
import { Response } from 'express';
import { readFileSync } from 'fs';
import * as fs from 'fs';
import { VideoDto } from '../video/dto/video.dto';
import { ImageDto } from '../image/dto/image.dto';
import { zip } from 'lodash';
import { log } from 'console';

@Injectable()
//Useful if it's impossible to save product along with videos
export class isProduitExistGuard implements CanActivate {
  constructor(private produitService: ProduitService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const produitId = req.params.id;
    console.log('#guard, Produit id = ' + produitId);
    const produit = await this.produitService.findOneId(produitId);
    if (!produit)
      throw new NotFoundException(`Produit with ID ${produitId} not found`);
    return true;
  }
}

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  create(@Body() produitDto: ProduitDto): Promise<Produit> {
    return this.produitService.create(produitDto);
  }

  @Get()
  findAll(): Promise<Produit[]> {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Produit> {
    return this.produitService.findOneId(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ): Promise<Produit> {
    return this.produitService.update(id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produitService.remove(id);
  }

  @Get('/byCategorie/:id')
  findProduitByCategorie(
    @Param('id', ParseIntPipe) categorieId: number,
  ): Promise<Produit[]> {
    return this.produitService.findProduitByCategorie(categorieId);
  }

  @Get('/bySousCategorie/:id')
  findProduitBySousCategorie(
    @Param('id', ParseIntPipe) sousCategorieId: number,
  ): Promise<Produit[]> {
    return this.produitService.findProduitBySousCategorie(sousCategorieId);
  }

  @Get('/produit_search/:name')
  findProduitByName(
    @Param('searchBarInput') searchBarInput: string,
  ): Promise<Produit[]> {
    return this.produitService.findProduitByName(searchBarInput);
  }

  //upload images

  @Post('images/:id')
  @UseInterceptors(FileInterceptor('images'))
  @UseGuards(isProduitExistGuard)

  // Provide an array of videos informations
  uploadImages(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() imageDto: ImageDto,
  ) {
    /*console.log('videoDto = ' + JSON.stringify(imageDto));
    console.log(id);
    console.log('videos = ' + JSON.stringify(image));*/

    //taking only filenames from files

    /*console.log('videosFilenames = ' + JSON.stringify(image.filename));
    console.log(' create video dto = ' + JSON.stringify(imageDto));*/

    // assigning each filename to the create dto of a video
    console.log(image);
    const img = new ImageDto();
      img.fileName = image.filename;

    console.log('result = ' + JSON.stringify(img));
    return this.produitService.uploadImages(img, +id);
  }

  //Upload videos

  @Post('videos/:id')
  @UseInterceptors(FileInterceptor('videos'))
  @UseGuards(isProduitExistGuard)

  // Provide an array of videos informations
  uploadVideos(
    @UploadedFile() video: Express.Multer.File,
    @Param('id') id: string,
    @Body() videoDto: VideoDto,
  ) {
    /*console.log('videoDto = ' + JSON.stringify(videoDto));
    console.log(id);
    console.log('videos = ' + JSON.stringify(video));*/

    //taking only filenames from files

    /*console.log('videosFilenames = ' + JSON.stringify(video.filename));
    console.log(' create video dto = ' + JSON.stringify(videoDto));*/

    // assigning each filename to the create dto of a video

    const vid = new VideoDto();

    vid.fileName = video.filename;

    console.log('result = ' + JSON.stringify(vid));
    return this.produitService.uploadVideos(vid, +id);
  }
}
