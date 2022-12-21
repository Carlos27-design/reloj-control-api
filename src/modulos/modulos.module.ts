import { Module } from '@nestjs/common';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './usuario/auth/auth.module';
import { RegistroModule } from './registro/registro.module';
import { EntradaModule } from './entrada/entrada.module';
import { SalidaColacionModule } from './salida-colacion/salida-colacion.module';
import { EntradaColacionModule } from './entrada-colacion/entrada-colacion.module';
import { SalidaModule } from './salida/salida.module';

@Module({
  imports: [
    UsuarioModule,
    TrabajadorModule,
    RolModule,
    AuthModule,
    RegistroModule,
    EntradaModule,
    SalidaColacionModule,
    EntradaColacionModule,
    SalidaModule,
  ],
})
export class ModulosModule {}
