import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario.entity';
import { META_ROLES } from './decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this._reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;

    if (!user) throw new BadRequestException('User Not Found');

    if (validRoles.includes(user.Roles.rol)) {
      return true;
    }

    throw new ForbiddenException(
      `User ${user.Trabajadores.nombre} need valid role [${validRoles}]`,
    );
  }
}
