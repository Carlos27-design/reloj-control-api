import { Module } from '@nestjs/common';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EntradaModule } from './entrada/entrada.module';
import { SalidaModule } from './salida/salida.module';
import { RolModule } from './rol/rol.module';

import { AuthModule } from './usuario/auth/auth.module';

@Module({
  imports: [
    UsuarioModule,
    TrabajadorModule,
    EntradaModule,
    SalidaModule,
    RolModule,
    AuthModule,
  ],
})
export class ModulosModule {}
