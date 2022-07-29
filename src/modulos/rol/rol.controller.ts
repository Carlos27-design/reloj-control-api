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

import { Rol } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private _rolService: RolService) {}

  @Get(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  get(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this._rolService.get(id);
  }

  @Get()
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  getAll(): Promise<Rol[]> {
    return this._rolService.getAll();
  }

  @Post()
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  create(@Body() rol: Rol): Promise<Rol> {
    return this._rolService.create(rol);
  }

  @Patch(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: Rol,
  ): Promise<void> {
    return this._rolService.update(id, rol);
  }

  @Delete(':id')
  @RoleProtected(ValidRoles.ADMINISTRADOR)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._rolService.delete(id);
  }
}
