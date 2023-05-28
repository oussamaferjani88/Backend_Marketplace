import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';


const corsOptions: CorsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  // app.use(express.json({limit : '10mb'}));
  // app.use(express.urlencoded({limit : '10mb', extended:true}));
  await app.listen(3000);

}
bootstrap();
