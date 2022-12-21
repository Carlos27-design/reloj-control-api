import { Module } from '@nestjs/common';
import { SalidaColacionService } from './salida-colacion.service';
import { SalidaColacionController } from './salida-colacion.controller';

@Module({
  providers: [SalidaColacionService],
  controllers: [SalidaColacionController]
})
export class SalidaColacionModule {}
