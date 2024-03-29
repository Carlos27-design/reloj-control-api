import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../usuario.entity';
import { UsuarioService } from '../usuario.service';
import { LoginAuthDto } from './dto';
import * as bcyrpt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _usuarioService: UsuarioService,
    private _jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, contrasena } = loginAuthDto;

    const usuario = await this._usuarioService.buscarUsuario(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    if (!bcyrpt.compareSync(contrasena, usuario.contrasena)) {
      throw new UnauthorizedException('Credenciales no validas');
    }

    return {
      usuario: {
        id: usuario.id,
        name: usuario.Trabajadores.nombre + ' ' + usuario.Trabajadores.apellido,
        email: usuario.email,
        avatar: '',
        status: usuario.estado,
      },
      ...usuario,
      token: this.getJwtToken({
        sub: usuario.id,
        email: usuario.email,
        roles: usuario.Roles.rol,
        trabajador:
          usuario.Trabajadores.nombre + ' ' + usuario.Trabajadores.apellido,
      }),
    };

    //TODO: Retornar el JWT de acceso
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this._jwtService.sign(payload);
    return token;
  }

  public async getPerfil(email: string): Promise<any> {
    const usuario = await this._usuarioService.buscarUsuario(email);
    return {
      id: usuario.id,
      name: usuario.Trabajadores.nombre + ' ' + usuario.Trabajadores.apellido,
      email: usuario.email,
      avatar: '',
      status: usuario.estado,
    };
  }
}
