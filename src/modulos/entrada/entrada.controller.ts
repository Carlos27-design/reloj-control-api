import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { Auth } from '../usuario/auth/decorators/auth.decorator';
import { Entrada } from './entrada.entity';
import { EntradaService } from './entrada.service';

@Controller('entrada')
export class EntradaController {
  constructor(private entradaService: EntradaService) {}

  @Get('ultimo-registro-entrada')
  @Auth()
  getUltimoRegistro(@Request() req): Promise<Entrada> {
    const trabajadorId = req.user.Trabajadores.id;
    return this.entradaService.getUltimoRegistro(trabajadorId);
  }

  @Get(':id')
  @Auth()
  get(@Param('id', ParseIntPipe) id: number): Promise<Entrada> {
    return this.entradaService.get(id);
  }

  @Get()
  @Auth()
  getAll(): Promise<Entrada[]> {
    return this.entradaService.getAll();
  }

  @Post()
  @Auth()
  create(@Body() entrada: Entrada, @Request() req): Promise<Entrada> {
    const trabajadorId = req.user.Trabajadores.id;
    entrada.Trabajador = trabajadorId;
    return this.entradaService.create(entrada, trabajadorId);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entrada: Entrada,
  ): Promise<void> {
    return this.entradaService.update(id, entrada);
  }

  @Delete(':id')
  @Auth()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.entradaService.delete(id);
  }
}
