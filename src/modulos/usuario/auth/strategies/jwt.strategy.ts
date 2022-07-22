import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from '../../usuario.entity';
import { usuarioRepository } from '../../usuario.repository';
import { UsuarioService } from '../../usuario.service';
import { jwtConstants } from '../constants';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { email } = payload;

    const usuario = await this._usuarioService.buscarUsuario(email);

    if (!usuario) throw new UnauthorizedException('Token no Valido');

    if (usuario.estado !== 'ACTIVO')
      throw new UnauthorizedException(
        'El usuario esta Inactivo, hable con un administrador',
      );

    return usuario;
  }
}
