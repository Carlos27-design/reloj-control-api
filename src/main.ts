import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // CAMBIAR AL MOMENTO DE COMPILAR VERSION DE PRODUCCION
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  await app.listen(3000);
}
bootstrap();
