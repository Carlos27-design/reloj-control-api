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
import { ParseIntPipe } from '@nestjs/common/pipes';

import { Auth } from '../usuario/auth/decorators/auth.decorator';
import { Salida } from './salida.entity';
import { SalidaService } from './salida.service';

@Controller('salida')
export class SalidaController {
  constructor(private salidaService: SalidaService) {}

  @Get('ultimo-registro-salida')
  @Auth()
  getUltimoRegistro(@Request() req): Promise<Salida> {
    const trabajadorId = req.user.Trabajadores.id;
    return this.salidaService.getUltimoRegistro(trabajadorId);
  }

  @Get(':id')
  @Auth()
  get(@Param('id', ParseIntPipe) id: number): Promise<Salida> {
    return this.salidaService.get(id);
  }

  @Get()
  @Auth()
  getAll(): Promise<Salida[]> {
    return this.salidaService.getAll();
  }

  @Post()
  @Auth()
  create(@Body() salida: Salida, @Request() req): Promise<Salida> {
    const trabajadorId = req.user.Trabajadores.id;
    salida.Trabajador = trabajadorId;
    return this.salidaService.create(salida, trabajadorId);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() salida: Salida,
  ): Promise<void> {
    return this.salidaService.update(id, salida);
  }

  @Delete(':id')
  @Auth()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salidaService.delete(id);
  }
}
