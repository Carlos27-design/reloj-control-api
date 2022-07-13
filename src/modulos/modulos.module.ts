import { Module } from '@nestjs/common';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, TrabajadorModule],
})
export class ModulosModule {}
