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
import { timeStamp } from 'console';
import { Salida } from './salida.entity';
import { SalidaService } from './salida.service';

@Controller('salida')
export class SalidaController {
  constructor(private _salidaService: SalidaService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Salida> {
    return this._salidaService.get(id);
  }

  @Get()
  getAll(): Promise<Salida[]> {
    return this._salidaService.getAll();
  }

  @Post()
  create(@Body() salida: Salida): Promise<Salida> {
    return this._salidaService.create(salida);
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
