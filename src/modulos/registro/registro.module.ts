import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrabajadorModule } from '../trabajador/trabajador.module';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';

@Module({
  controllers: [RegistroController],
  providers: [RegistroService],
  imports: [TrabajadorModule, ConfigModule.forRoot()],
})
export class RegistroModule {}
