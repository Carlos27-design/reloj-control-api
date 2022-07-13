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
import { Trabajador } from './trabajador.entity';
import { TrabajadorService } from './trabajador.service';

@Controller('trabajador')
export class TrabajadorController {
  constructor(private _trabajadorService: TrabajadorService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Trabajador> {
    return this._trabajadorService.get(id);
  }

  @Get()
  getAll(): Promise<Trabajador[]> {
    return this._trabajadorService.getAll();
  }

  @Post()
  create(@Body() trabajador: Trabajador): Promise<Trabajador> {
    return this._trabajadorService.create(trabajador);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() trabajador: Trabajador,
  ): Promise<void> {
    return this._trabajadorService.update(id, trabajador);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._trabajadorService.delete(id);
  }
}
