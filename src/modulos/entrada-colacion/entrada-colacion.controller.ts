import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Auth } from '../usuario/auth/decorators/auth.decorator';

import { EntradaColacion } from './entrada-colacion.entity';
import { EntradaColacionService } from './entrada-colacion.service';

@Controller('entrada-colacion')
export class EntradaColacionController {
  constructor(private entradaColacionService: EntradaColacionService) {}

  @Get('ultimo-registro-entradacolacion')
  @Auth()
  getUltimoRegistro(): Promise<EntradaColacion> {
    return this.entradaColacionService.getUltimoRegistro();
  }

  @Get(':id')
  @Auth()
  get(@Param('id', ParseIntPipe) id: number): Promise<EntradaColacion> {
    return this.entradaColacionService.get(id);
  }

  @Get()
  @Auth()
  getAll(): Promise<EntradaColacion[]> {
    return this.entradaColacionService.getAll();
  }

  @Post()
  @Auth()
  create(
    @Body() entradaColacion: EntradaColacion,
    @Request() req,
  ): Promise<EntradaColacion> {
    const trabajadorId = req.user.Trabajadores.id;
    entradaColacion.Trabajador.id = trabajadorId;
    return this.entradaColacionService.create(entradaColacion, trabajadorId);
  }

  @Patch()
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entradaColacion: EntradaColacion,
  ): Promise<void> {
    return this.entradaColacionService.update(id, entradaColacion);
  }

  @Delete()
  @Auth()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.entradaColacionService.delete(id);
  }
}
