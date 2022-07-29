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
import { RoleProtected } from '../usuario/auth/decorators/role-protected.decorator';
import { ValidRoles } from '../usuario/auth/interface';
import { JwtAuthGuard } from '../usuario/auth/local-auth.guard';
import { UserRoleGuard } from '../usuario/auth/user-role.guard';
import { Trabajador } from './trabajador.entity';
import { TrabajadorService } from './trabajador.service';

@Controller('trabajador')
export class TrabajadorController {
  constructor(private _trabajadorService: TrabajadorService) {}

  @Get(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  get(@Param('id', ParseIntPipe) id: number): Promise<Trabajador> {
    return this._trabajadorService.get(id);
  }

  @Get()
  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  getAll(): Promise<Trabajador[]> {
    return this._trabajadorService.getAll();
  }

  @Post()
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
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
