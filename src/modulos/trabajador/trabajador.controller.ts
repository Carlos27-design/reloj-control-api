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
import { Auth } from '../usuario/auth/decorators/auth.decorator';

import { ValidRoles } from '../usuario/auth/interface';

import { Trabajador } from './trabajador.entity';
import { TrabajadorService } from './trabajador.service';

@Controller('trabajador')
export class TrabajadorController {
  constructor(private _trabajadorService: TrabajadorService) {}

  @Get(':id')
  @Auth(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  get(@Param('id', ParseIntPipe) id: number): Promise<Trabajador> {
    return this._trabajadorService.get(id);
  }

  @Get()
  @Auth(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  getAll(): Promise<Trabajador[]> {
    return this._trabajadorService.getAll();
  }

  @Post()
  @Auth(ValidRoles.ADMINISTRADOR)
  create(@Body() trabajador: Trabajador): Promise<Trabajador> {
    return this._trabajadorService.create(trabajador);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() trabajador: Trabajador,
  ): Promise<void> {
    return this._trabajadorService.update(id, trabajador);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._trabajadorService.delete(id);
  }
}
