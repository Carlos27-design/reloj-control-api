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
  RequestMapping,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../usuario/auth/local-auth.guard';
import { Entrada } from './entrada.entity';
import { EntradaService } from './entrada.service';

@Controller('entrada')
export class EntradaController {
  constructor(private _entradaService: EntradaService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Entrada> {
    return this._entradaService.get(id);
  }
  @UseGuards(JwtAuthGuard, AuthGuard())
  @Get()
  getAll(@Request() req): Promise<Entrada[]> {
    const trabajadorId = req.user.Trabajadores.id;
    return this._entradaService.getAll(trabajadorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() entrada: Entrada, @Request() req): Promise<Entrada> {
    const trabajadorId = req.user.Trabajadores.id;
    return this._entradaService.create(entrada, trabajadorId);
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
