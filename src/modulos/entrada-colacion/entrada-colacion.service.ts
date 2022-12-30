import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { estado } from 'src/shared/estado.enum';
import { Entrada } from '../entrada/entrada.entity';
import { Trabajador } from '../trabajador/trabajador.entity';
import { EntradaColacion } from './entrada-colacion.entity';
import { entradaColacionRepository } from './entrada-colacion.repository';

@Injectable()
export class EntradaColacionService {
  public async get(id: number): Promise<EntradaColacion> {
    const entradaColacion = await entradaColacionRepository
      .createQueryBuilder('EntradaColacion')
      .where('EntradaColacion.id = :id', { id: id })
      .andWhere('EntradaColacion.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!entradaColacion) throw new NotFoundException();

    return entradaColacion;
  }

  public async getUltimoRegistro(
    trabajadorId: number,
  ): Promise<EntradaColacion> {
    const entradaColacion = await entradaColacionRepository
      .createQueryBuilder('EntradaColacion')
      .leftJoinAndSelect('EntradaColacion.Trabajador', 'Trabajador')
      .where('Trabajador.id = :id', { id: trabajadorId })
      .andWhere('EntradaColacion.estado = :estado', { estado: estado.ACTIVO })
      .orderBy('EntradaColacion.id', 'DESC')
      .getOne();

    if (!entradaColacion) throw new NotFoundException();

    return entradaColacion;
  }

  public getAll(): Promise<EntradaColacion[]> {
    return entradaColacionRepository
      .createQueryBuilder('EntradaColacion')
      .where('EntradaColacion.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(
    entradaColacion: EntradaColacion,
    trabajadorId: number,
  ): Promise<EntradaColacion> {
    const trabajador: Trabajador = new Trabajador();
    trabajador.id = trabajadorId;
    entradaColacion.Trabajador = trabajador;
    return entradaColacionRepository.save(entradaColacion);
  }

  public async update(
    id: number,
    entradaColacion: EntradaColacion,
  ): Promise<void> {
    let entradaColacionDB = await this.get(id);

    entradaColacionDB.botonEstado = entradaColacion.botonEstado;

    await entradaColacionDB.save();
  }

  public async delete(id: number): Promise<void> {
    let entradaColacionDB = await this.get(id);

    entradaColacionDB.estado = estado.INACTIVO;

    await entradaColacionDB.save();
  }
}
