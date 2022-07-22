import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Usuario } from './usuario.entity';
import { usuarioRepository } from './usuario.repository';
import * as bcrypt from 'bcrypt';
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

  public async create(usuario: Usuario): Promise<Usuario> {
    const hashed = await bcrypt.hash(usuario.contrasena, 12);

    let nuevoUsuario: Usuario = new Usuario();

    nuevoUsuario.email = usuario.email;
    nuevoUsuario.contrasena = hashed;
    nuevoUsuario.Roles = usuario.Roles;
    nuevoUsuario.Trabajadores = usuario.Trabajadores;

    return await usuarioRepository.save(nuevoUsuario);
  }

  public async update(id: number, usuario: Usuario): Promise<void> {
    const hashed = await bcrypt.hash(usuario.contrasena, 12);

    let usuarioDB = await this.get(id);
    usuarioDB.email = usuario.email;
    usuarioDB.contrasena = hashed;
    usuarioDB.Roles = usuario.Roles;
    await usuarioDB.save();
  }

  public async delete(id: number): Promise<void> {
    let usuarioDB = await this.get(id);

    usuarioDB.estado = estado.INACTIVO;

    await usuarioDB.save();
  }

  public async buscarUsuario(email: string): Promise<Usuario> {
    return usuarioRepository
      .createQueryBuilder('Usuario')
      .leftJoinAndSelect('Usuario.Roles', 'Rol')
      .leftJoinAndSelect('Usuario.Trabajadores', 'Trabajador')
      .where('Usuario.email = :email', { email: email })
      .andWhere('Usuario.estado = :estado', { estado: estado.ACTIVO })
      .getOne();
  }
}
