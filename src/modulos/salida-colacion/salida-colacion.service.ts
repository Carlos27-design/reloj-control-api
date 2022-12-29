import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Trabajador } from '../trabajador/trabajador.entity';
import { SalidaColacion } from './salida-colacion.entity';
import { salidaColacionRepository } from './salida-colacion.repository';

@Injectable()
export class SalidaColacionService {
  public async get(id: number): Promise<SalidaColacion> {
    const salidaColacion = await salidaColacionRepository
      .createQueryBuilder('SalidaColacion')
      .where('SalidaColacion.id = :id', { id: id })
      .andWhere('SalidaColacion.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!salidaColacion) throw new NotFoundException();

    return salidaColacion;
  }

  public async getUtimoRegistro(): Promise<SalidaColacion> {
    const salidaColacion = await salidaColacionRepository
      .createQueryBuilder('SalidaColacion')
      .where('SalidaColacion.estado = :estado', { estado: estado.ACTIVO })
      .orderBy('SalidaColacion.id', 'DESC')
      .getOne();

    if (!salidaColacion) throw new NotFoundException();

    return salidaColacion;
  }

  public getAll(): Promise<SalidaColacion[]> {
    return salidaColacionRepository
      .createQueryBuilder('SalidaColacion')
      .where('SalidaColacion.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(
    salidaColacion: SalidaColacion,
    trabajadorId: number,
  ): Promise<SalidaColacion> {
    const trabajador: Trabajador = new Trabajador();
    trabajador.id = trabajadorId;
    salidaColacion.Trabajador = trabajador;
    return salidaColacionRepository.save(salidaColacion);
  }

  public async update(
    id: number,
    salidaColacion: SalidaColacion,
  ): Promise<void> {
    let salidaColacionDB = await this.get(id);

    salidaColacionDB.botonEstado = salidaColacion.botonEstado;

    await salidaColacionDB.save();
  }

  public async delete(id: number): Promise<void> {
    let salidaColacionDB = await this.get(id);

    salidaColacionDB.estado = estado.INACTIVO;

    await salidaColacionDB.save();
  }
}
