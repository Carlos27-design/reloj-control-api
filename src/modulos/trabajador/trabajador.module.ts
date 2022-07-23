import { Module } from '@nestjs/common';
import { TrabajadorController } from './trabajador.controller';
import { TrabajadorService } from './trabajador.service';

@Module({
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
  exports: [TrabajadorService],
})
export class TrabajadorModule {}
