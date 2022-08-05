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
import { Auth } from '../usuario/auth/decorators/auth.decorator';
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
  @Auth(ValidRoles.ADMINISTRADOR)
  get(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this._rolService.get(id);
  }

  @Get()
  @Auth(ValidRoles.ADMINISTRADOR)
  getAll(): Promise<Rol[]> {
    return this._rolService.getAll();
  }

  @Post()
  @Auth(ValidRoles.ADMINISTRADOR)
  create(@Body() rol: Rol): Promise<Rol> {
    return this._rolService.create(rol);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: Rol,
  ): Promise<void> {
    return this._rolService.update(id, rol);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMINISTRADOR)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._rolService.delete(id);
  }
}
