import { Module } from '@nestjs/common';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';

@Module({
  controllers: [EntradaController],
  providers: [EntradaService]
})
export class EntradaModule {}
