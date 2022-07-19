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
import { Rol } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private _rolService: RolService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this._rolService.get(id);
  }

  @Get()
  getAll(): Promise<Rol[]> {
    return this._rolService.getAll();
  }

  @Post()
  create(@Body() rol: Rol): Promise<Rol> {
    return this._rolService.create(rol);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: Rol,
  ): Promise<void> {
    return this._rolService.update(id, rol);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._rolService.delete(id);
  }
}
