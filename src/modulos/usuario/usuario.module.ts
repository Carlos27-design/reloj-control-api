import { Module } from '@nestjs/common';

import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [AuthModule],
})
export class UsuarioModule {}
