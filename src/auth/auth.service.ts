import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  
    constructor(
      private utilisateurService: UtilisateurService,
        private adminService: AdminService ,
        private jwtService: JwtService
        ) {} 

      async AdminlogIn(username: string, pwd: string): Promise<any> {
        const admin = await this.adminService.validateAdmin(username,pwd);
        if (!admin) {
            throw new UnauthorizedException();
          }
          const payload = { username: admin.username, sub: admin.id };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
      }
      
      async UserlogIn(email: string, pwd: string): Promise<any> {
        const user = await this.utilisateurService.validateUser(email,pwd);
        if (!user) {
            throw new UnauthorizedException();
          }
          const payload = { email: user.email, sub: user.id };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
      }
}
