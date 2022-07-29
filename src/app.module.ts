import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ModulosModule } from './modulos/modulos.module';

@Module({
  imports: [ConfigModule.forRoot(), ModulosModule],
})
export class AppModule {}
