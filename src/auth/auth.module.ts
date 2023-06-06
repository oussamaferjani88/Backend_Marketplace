import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/auth.constants';

@Module({

  imports: [
    UtilisateurModule,
    AdminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
  
})

export class AuthModule { }
