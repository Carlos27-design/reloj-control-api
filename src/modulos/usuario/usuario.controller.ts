import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleProtected } from './auth/decorators/role-protected.decorator';
import { ValidRoles } from './auth/interface';
import { JwtAuthGuard } from './auth/local-auth.guard';
import { UserRoleGuard } from './auth/user-role.guard';
import { Usuario } from './usuario.entity';

import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private _usuarioService: UsuarioService) {}

  @Get(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  get(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this._usuarioService.get(id);
  }

  @Get()
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  getAll(): Promise<Usuario[]> {
    return this._usuarioService.getAll();
  }

  @Post()
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return await this._usuarioService.create(usuario);
  }

  @Patch(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<void> {
    return this._usuarioService.update(id, usuario);
  }

  @Delete(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._usuarioService.delete(id);
  }
}
