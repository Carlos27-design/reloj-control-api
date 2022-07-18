import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Entrada } from './entrada.entity';
import { entradaRepository } from './entrada.repository';

@Injectable()
export class EntradaService {
  public async get(id: number): Promise<Entrada> {
    const entrada = await entradaRepository
      .createQueryBuilder('Entrada')
      .where('Entrada.id = :id', { id: id })
      .andWhere('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!entrada) throw new NotFoundException();

    return entrada;
  }

  public getAll(): Promise<Entrada[]> {
    return entradaRepository
      .createQueryBuilder('Entrada')
      .where('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(entrada: Entrada): Promise<Entrada> {
    entrada.entrada = new Date();
    return entradaRepository.save(entrada);
  }

  public async update(id: number, entrada: Entrada): Promise<void> {
    let entradaDB = await this.get(id);

    entradaDB.entrada = entrada.entrada;

    await entradaDB.save();
  }

  public async delete(id: number): Promise<void> {
    let entradaDB = await this.get(id);

    entradaDB.estado = estado.INACTIVO;

    await entradaDB.save();
  }
}
