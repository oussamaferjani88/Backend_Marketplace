import { Controller, Get, Post, Body, Patch, Param, Delete ,  UploadedFile,  CanActivate, ExecutionContext,
  NotFoundException,BadRequestException} from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { CategorieService } from './categorie.service';
import { Produit } from 'src/produit/entities/produit.entity';
import { Express } from 'express';

import {
  Header,
  Injectable,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Injectable()
export class isCategorieExistGuard implements CanActivate {
  constructor(private categorieService: CategorieService) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const idCategorie = req.params.id;
    console.log('#guard, Categorie id = ' + idCategorie);
    const f = await this.categorieService.findOne(idCategorie);
    if (!f)
      throw new NotFoundException(`Categorie with ID ${idCategorie} not found`);
    return true;
  }
}



@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  @Post()
  create(@Body() createCategorieDto: any) {
    console.log('createFormationDto = ' + JSON.stringify(createCategorieDto));
    return this.categorieService.create(createCategorieDto);
  }

  // // upload image
  // @Post('coverImage/:id')
  // @UseInterceptors(FileInterceptor('coverImage'))
  // @UseGuards(isCategorieExistGuard)
  // uploadCoverImage(
  //   @UploadedFile() coverImage: Express.Multer.File,
  //   @Param('id') id: string,
  // ) {
  //   return this.categorieService.uploadCoverImage(coverImage.filename, +id);
  // }

  @Post('coverImage/:id')
  @UseInterceptors(FileInterceptor('coverImage'))
  @UseGuards(isCategorieExistGuard)
  uploadCoverImage(
    @UploadedFile() coverImage: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (coverImage) {
      
      return this.categorieService.uploadCoverImage(coverImage.filename, +id);
     
    } else {
      throw new BadRequestException('No cover image provided');
    }
  }
  

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategorieDto: UpdateCategorieDto) {
  //   return this.categorieService.update(+id, updateCategorieDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(+id);
  }
 


}
