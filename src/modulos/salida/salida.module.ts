import { Module } from '@nestjs/common';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';

@Module({
  controllers: [SalidaController],
  providers: [SalidaService]
})
export class SalidaModule {}
