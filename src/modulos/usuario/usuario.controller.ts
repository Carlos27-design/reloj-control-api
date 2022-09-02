import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from './auth/decorators/auth.decorator';
import { ValidRoles } from './auth/interface';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private _usuarioService: UsuarioService) {}

  @Get(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  get(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this._usuarioService.get(id);
  }

  @Get()
  @Auth(ValidRoles.ADMINISTRADOR)
  getAll(): Promise<Usuario[]> {
    return this._usuarioService.getAll();
  }

  @Post()
  @Auth(ValidRoles.ADMINISTRADOR)
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return await this._usuarioService.create(usuario);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<void> {
    return this._usuarioService.update(id, usuario);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._usuarioService.delete(id);
  }
}
