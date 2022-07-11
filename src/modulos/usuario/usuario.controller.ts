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
import { Usuario } from './usuario.entity';

import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private _usuarioService: UsuarioService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this._usuarioService.get(id);
  }

  @Get()
  getAll(): Promise<Usuario[]> {
    return this._usuarioService.getAll();
  }

  @Post()
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this._usuarioService.create(usuario);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<void> {
    return this._usuarioService.update(id, usuario);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._usuarioService.delete(id);
  }
}
