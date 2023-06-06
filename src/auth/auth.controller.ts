import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto } from '../admin/dto/admin.dto';
import { UtilisateurDto } from '../utilisateur/dto/utilisateur.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('Adminlogin')
    AdminLogIn(@Body() admin: AdminDto) {
        return this.authService.AdminlogIn(admin.username, admin.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('Userlogin')
    UtilisateurLogIn(@Body() utilisateur: UtilisateurDto) {
        return this.authService.UserlogIn(utilisateur.email, utilisateur.password);
    }
    

}
