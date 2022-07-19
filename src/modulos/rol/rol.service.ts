import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Rol } from './rol.entity';
import { rolRepository } from './rol.repository';

@Injectable()
export class RolService {
  public async get(id: number): Promise<Rol> {
    const rol = await rolRepository
      .createQueryBuilder('Rol')
      .where('Rol.id = :id', { id: id })
      .andWhere('Rol.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!rol) throw new NotFoundException();

    return rol;
  }

  public getAll(): Promise<Rol[]> {
    return rolRepository
      .createQueryBuilder('Rol')
      .where('Rol.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(rol: Rol): Promise<Rol> {
    return rolRepository.save(rol);
  }

  public async update(id: number, rol: Rol): Promise<void> {
    let rolDB = await this.get(id);

    rolDB.rol = rol.rol;

    await rolDB.save();
  }

  public async delete(id: number): Promise<void> {
    let rolDB = await this.get(id);

    rolDB.estado = estado.INACTIVO;

    await rolDB.save();
  }
}
