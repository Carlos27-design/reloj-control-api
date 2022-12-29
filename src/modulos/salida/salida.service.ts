import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { estado } from 'src/shared/estado.enum';
import { Trabajador } from '../trabajador/trabajador.entity';
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

  public async getUltimoRegistro(): Promise<Salida> {
    const salida = await salidaRepository
      .createQueryBuilder('Salida')
      .where('Salida.estado = :estado', { estado: estado.ACTIVO })
      .orderBy('Salida.id', 'DESC')
      .getOne();

    if (!salida) throw new NotFoundException();

    return salida;
  }

  public getAll(): Promise<Salida[]> {
    return salidaRepository
      .createQueryBuilder()
      .where('Salida.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(salida: Salida, trabajadorId: number): Promise<Salida> {
    const trabajador: Trabajador = new Trabajador();
    trabajador.id = trabajadorId;
    salida.Trabajador = trabajador;
    console.log(trabajador);
    return salidaRepository.save(salida);
  }

  public async update(id: number, salida: Salida): Promise<void> {
    let salidaDB = await this.get(id);

    salidaDB.botonEstado = salida.botonEstado;

    await salidaDB.save();
  }

  public async delete(id: number): Promise<void> {
    let salidaDB = await this.get(id);

    salidaDB.estado = estado.INACTIVO;

    await salidaDB.save();
  }
}
