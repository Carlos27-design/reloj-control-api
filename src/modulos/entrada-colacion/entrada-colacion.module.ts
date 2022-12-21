import { Module } from '@nestjs/common';
import { EntradaColacionService } from './entrada-colacion.service';
import { EntradaColacionController } from './entrada-colacion.controller';

@Module({
  providers: [EntradaColacionService],
  controllers: [EntradaColacionController]
})
export class EntradaColacionModule {}
