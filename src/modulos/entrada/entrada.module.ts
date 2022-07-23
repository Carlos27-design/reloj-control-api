import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TrabajadorModule } from '../trabajador/trabajador.module';
import { AuthModule } from '../usuario/auth/auth.module';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TrabajadorModule,
  ],
  controllers: [EntradaController],
  providers: [EntradaService],
})
export class EntradaModule {}
