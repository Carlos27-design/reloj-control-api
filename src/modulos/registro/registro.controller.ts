import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleProtected } from '../usuario/auth/decorators/role-protected.decorator';
import { ValidRoles } from '../usuario/auth/interface';

import { JwtAuthGuard } from '../usuario/auth/local-auth.guard';
import { UserRoleGuard } from '../usuario/auth/user-role.guard';
import { RegistroService } from './registro.service';
import { Registro } from './regitro.entity';

@Controller('registro')
export class RegistroController {
  constructor(private registroService: RegistroService) {}

  @Get(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  get(@Param('id', ParseIntPipe) id: number): Promise<Registro> {
    return this.registroService.get(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req): Promise<Registro[]> {
    const trabajadorId = req.user.Trabajadores.id;
    return this.registroService.getAll(trabajadorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() registro: Registro, @Request() req): Promise<Registro> {
    const trabajadorId = req.user.Trabajadores.id;
    const correo = req.user.email;
    return this.registroService.create(registro, trabajadorId, correo);
  }

  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() registro: Registro,
  ): Promise<void> {
    return this.registroService.update(id, registro);
  }

  @RoleProtected(ValidRoles.ADMINISTRADOR, ValidRoles.RECURSOSHUMANOS)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.registroService.delete(id);
  }
}
