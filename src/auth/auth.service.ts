import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  
    constructor(
        private adminService: AdminService ,
        private jwtService: JwtService
        ) {} 

      async logIn(username: string, pwd: string): Promise<any> {
        const admin = await this.adminService.validateUser(username,pwd);
        if (!admin) {
            throw new UnauthorizedException();
          }
          const payload = { username: admin.username, sub: admin.id };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
      }
      
}
