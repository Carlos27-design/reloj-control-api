import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Usuario } from './usuario.entity';
import { usuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  public async get(id: number): Promise<Usuario> {
    const usuario = await usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id: id })
      .andWhere('usuario.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!usuario) throw new NotFoundException();

    return usuario;
  }

  public getAll(): Promise<Usuario[]> {
    return usuarioRepository
      .createQueryBuilder('Usuario')
      .where('Usuario.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(usuario: Usuario): Promise<Usuario> {
    return usuarioRepository.save(usuario);
  }

  public async update(id: number, usuario: Usuario): Promise<void> {
    let usuarioDB = await this.get(id);
    usuarioDB.email = usuario.email;
    usuarioDB.contrasena = usuario.contrasena;
    await usuarioDB.save();
  }

  public async delete(id: number): Promise<void> {
    let usuarioDB = await this.get(id);

    usuarioDB.estado = estado.INACTIVO;

    await usuarioDB.save();
  }
}
