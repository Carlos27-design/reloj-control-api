import { Module } from '@nestjs/common';

import { ModulosModule } from './modulos/modulos.module';

@Module({
  imports: [ModulosModule],
})
export class AppModule {}
