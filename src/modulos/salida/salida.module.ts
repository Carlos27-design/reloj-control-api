import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TrabajadorModule } from '../trabajador/trabajador.module';
import { SalidaController } from './salida.controller';
import { SalidaService } from './salida.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TrabajadorModule,
  ],
  controllers: [SalidaController],
  providers: [SalidaService],
})
export class SalidaModule {}
