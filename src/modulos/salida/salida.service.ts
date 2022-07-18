import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Salida } from './salida.entity';
import { salidaRepository } from './salida.repository';

@Injectable()
export class SalidaService {
  public async get(id: number): Promise<Salida> {
    const salida = await salidaRepository
      .createQueryBuilder('Salida')
      .where('Salida.id = :id', { id: id })
      .andWhere('Salida.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!salida) throw new NotFoundException();

    return salida;
  }

  public getAll(): Promise<Salida[]> {
    return salidaRepository
      .createQueryBuilder('Salida')
      .where('Salida.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(salida: Salida): Promise<Salida> {
    return salidaRepository.save(salida);
  }

  public async update(id: number, salida: Salida): Promise<void> {
    let salidaDB = await this.get(id);

    salidaDB.salida = salida.salida;

    await salidaDB.save();
  }

  public async delete(id: number): Promise<void> {
    let salidaDB = await this.get(id);

    salidaDB.estado = estado.INACTIVO;

    await salidaDB.save();
  }
}
