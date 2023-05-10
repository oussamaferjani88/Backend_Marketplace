import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto } from '../admin/dto/admin.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('logIn')
    signIn(@Body() adminDto: AdminDto) {
        return this.authService.logIn(adminDto.username, adminDto.password);
    }

}
