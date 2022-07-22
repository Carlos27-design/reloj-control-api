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
import { AuthGuard } from '@nestjs/passport';
import { Entrada } from './entrada.entity';
import { EntradaService } from './entrada.service';

@Controller('entrada')
export class EntradaController {
  constructor(private _entradaService: EntradaService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Entrada> {
    return this._entradaService.get(id);
  }

  @Get()
  getAll(): Promise<Entrada[]> {
    return this._entradaService.getAll();
  }

  @Post()
  create(@Body() entrada: Entrada): Promise<Entrada> {
    return this._entradaService.create(entrada);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entrada: Entrada,
  ): Promise<void> {
    return this._entradaService.update(id, entrada);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._entradaService.delete(id);
  }
}
