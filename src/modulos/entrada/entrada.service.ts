import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Trabajador } from '../trabajador/trabajador.entity';

import { Entrada } from './entrada.entity';
import { entradaRepository } from './entrada.repository';

@Injectable()
export class EntradaService {
  constructor() {}

  public async get(id: number): Promise<Entrada> {
    const entrada = await entradaRepository
      .createQueryBuilder('Entrada')
      .where('Entrada.id = :id', { id: id })
      .andWhere('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!entrada) throw new NotFoundException();

    return entrada;
  }

  public async getUltimoRegistro(trabajadorId: number): Promise<Entrada> {
    const entrada = await entradaRepository
      .createQueryBuilder('Entrada')
      .leftJoinAndSelect('Entrada.Trabajador', 'Trabajador')
      .where('Trabajador.id = :id', { id: trabajadorId })
      .where('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .orderBy('Entrada.id', 'DESC')
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

  public create(entrada: Entrada, trabajadorId: number): Promise<Entrada> {
    const trabajador: Trabajador = new Trabajador();
    trabajador.id = trabajadorId;
    entrada.Trabajador = trabajador;
    console.log(trabajador);
    return entradaRepository.save(entrada);
  }

  public async update(id: number, entrada: Entrada): Promise<void> {
    let entradaDB = await this.get(id);

    entradaDB.botonEstado = entrada.botonEstado;

    await entradaDB.save();
  }

  public async delete(id: number): Promise<void> {
    let entradaDB = await this.get(id);

    entradaDB.estado = estado.INACTIVO;

    await entradaDB.save();
  }
}
