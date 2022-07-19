import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Usuario } from './usuario.entity';
import { usuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  public async get(id: number): Promise<Usuario> {
    const usuario = await usuarioRepository
      .createQueryBuilder('Usuario')
      .leftJoinAndSelect('Usuario.Roles', 'Rol')
      .leftJoinAndSelect('Usuario.Trabajadores', 'Trabajador')
      .where('Usuario.id = :id', { id: id })
      .andWhere('Usuario.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!usuario) throw new NotFoundException();

    return usuario;
  }

  public getAll(): Promise<Usuario[]> {
    return usuarioRepository
      .createQueryBuilder('Usuario')
      .leftJoinAndSelect('Usuario.Roles', 'Rol')
      .leftJoinAndSelect('Usuario.Trabajadores', 'Trabajador')
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
    usuarioDB.Roles = usuario.Roles;
    await usuarioDB.save();
  }

  public async delete(id: number): Promise<void> {
    let usuarioDB = await this.get(id);

    usuarioDB.estado = estado.INACTIVO;

    await usuarioDB.save();
  }
}
