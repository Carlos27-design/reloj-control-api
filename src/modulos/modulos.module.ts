import { Module } from '@nestjs/common';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioModule } from './usuario/usuario.module';

import { RolModule } from './rol/rol.module';

//import { AuthModule } from './usuario/auth/auth.module';
import { RegistroModule } from './registro/registro.module';

@Module({
  imports: [
    UsuarioModule,
    TrabajadorModule,
    RolModule,
    //AuthModule,
    RegistroModule,
  ],
})
export class ModulosModule {}
