import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Patch, Post } from '@nestjs/common/decorators';
import { Auth } from '../usuario/auth/decorators/auth.decorator';
import { SalidaColacion } from './salida-colacion.entity';
import { SalidaColacionService } from './salida-colacion.service';

@Controller('salida-colacion')
export class SalidaColacionController {
  constructor(private salidaColacionService: SalidaColacionService) {}

  @Get('ultimo-registro-salidacolacion')
  @Auth()
  getUltimoRegistro(): Promise<SalidaColacion> {
    return this.salidaColacionService.getUtimoRegistro();
  }

  @Get(':id')
  @Auth()
  get(@Param('id', ParseIntPipe) id: number): Promise<SalidaColacion> {
    return this.salidaColacionService.get(id);
  }

  @Get()
  @Auth()
  getAll(): Promise<SalidaColacion[]> {
    return this.salidaColacionService.getAll();
  }

  @Post()
  @Auth()
  create(@Body() salidaColacion: SalidaColacion): Promise<SalidaColacion> {
    return this.salidaColacionService.create(salidaColacion);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() salidaColacion: SalidaColacion,
  ): Promise<void> {
    return this.salidaColacionService.update(id, salidaColacion);
  }

  @Delete(':id')
  @Auth()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salidaColacionService.delete(id);
  }
}
