import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AdminModule } from './admin/admin.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { CategorieModule } from './categorie/categorie.module';
import { SousCategorieModule } from './sous-categorie/sous-categorie.module';
import { ProduitModule } from './produit/produit.module';
import { SignalModule } from './signal/signal.module';
import { MessageModule } from './message/message.module';
import { ImageModule } from './image/image.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AdminModule,
    UtilisateurModule,
    EvaluationModule,
    BoutiqueModule,
    CategorieModule,
    SousCategorieModule,
    ProduitModule,
    SignalModule,
    MessageModule,
    ImageModule,
    VideoModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'oussama',
      database: 'marketplace',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
