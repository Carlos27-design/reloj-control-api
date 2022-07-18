import { Module } from '@nestjs/common';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EntradaModule } from './entrada/entrada.module';

@Module({
  imports: [UsuarioModule, TrabajadorModule, EntradaModule],
})
export class ModulosModule {}
