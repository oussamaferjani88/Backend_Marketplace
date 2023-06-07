import { Controller, Get, Post, Body, Patch,Put , Param, Delete ,  UploadedFile,  CanActivate, ExecutionContext,
  NotFoundException,BadRequestException  ,Res,} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './entities/utilisateur.entity';
import { UtilisateurDto } from './dto/utilisateur.dto';
import { Express } from 'express';
import { readFileSync } from 'fs';
import * as fs from 'fs';
import { Response } from 'express';
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
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';









@Injectable()
export class isUtilisateurExistGuard implements CanActivate {
  constructor(private utilisateurService: UtilisateurService) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const idUtilisateur = req.params.id;
    console.log('#guard, Utilisateur id = ' + idUtilisateur  );
    const f = await this.utilisateurService.findOneId(idUtilisateur);
    if (!f)
      throw new NotFoundException(`Utilisateur with ID ${idUtilisateur} not found`);
    return true;
  }
}

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Get()
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Utilisateur> {
    return this.utilisateurService.findOneId(id);
  }

 
  @Post('Register')
  async Register(@Body() utilisateur: UtilisateurDto): Promise<Utilisateur> {
    //console.log('creating utilisateur:', utilisateur);
    try {
      const createdUtilisateur = await this.utilisateurService.create(utilisateur);
      console.log('created utilisateur:', createdUtilisateur);
      return createdUtilisateur;
    } catch (error) {
      console.error('error creating utilisateur:', error);
      throw error;
    }
  }

  // async update(id: number, utilisateur: Partial<Utilisateur>,): Promise<Utilisateur> {
  //   await this.utilisateurRepository.update(id, utilisateur);
  //   return this.utilisateurRepository.findOne({ where: { id } });
  // }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() utilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    return this.utilisateurService.update(id, utilisateurDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.utilisateurService.remove(id);
  }



  @Post('profileImage/:id')
  @UseInterceptors(FileInterceptor('profileImage'))
  @UseGuards(isUtilisateurExistGuard)
  uploadProfileImage(
    @UploadedFile() profileImage: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (profileImage) {
      
      return this.utilisateurService.uploadProfileImage( profileImage.filename, +id);
     
    } else {
      throw new BadRequestException('No profile image provided');
    }
  }
  

  @Get('image/:filename')
  async serveImage(@Res() res: Response, @Param('filename') filename: string) {
    const image = readFileSync(`./uploads/${filename}`);
    res.contentType('image/jpeg');
    res.send(image);
  }







}
