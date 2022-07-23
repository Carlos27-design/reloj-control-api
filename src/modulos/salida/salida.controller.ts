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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { timeStamp } from 'console';
import { JwtAuthGuard } from '../usuario/auth/local-auth.guard';
import { Salida } from './salida.entity';
import { SalidaService } from './salida.service';

@Controller('salida')
export class SalidaController {
  constructor(private _salidaService: SalidaService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Salida> {
    return this._salidaService.get(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard())
  @Get()
  getAll(@Request() req): Promise<Salida[]> {
    const trabajadorId = req.user.Trabajadores.id;
    return this._salidaService.getAll(trabajadorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() salida: Salida, @Request() req): Promise<Salida> {
    const trabajadorId = req.user.Trabajadores.id;
    return this._salidaService.create(salida, trabajadorId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() salida: Salida,
  ): Promise<void> {
    return this._salidaService.update(id, salida);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._salidaService.delete(id);
  }
}
