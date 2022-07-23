import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { TrabajadorService } from '../trabajador/trabajador.service';
import { Salida } from './salida.entity';
import { salidaRepository } from './salida.repository';

@Injectable()
export class SalidaService {
  constructor(private trabajadorService: TrabajadorService) {}

  public async get(id: number): Promise<Salida> {
    const salida = await salidaRepository
      .createQueryBuilder('Salida')
      .where('Salida.id = :id', { id: id })
      .andWhere('Salida.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!salida) throw new NotFoundException();

    return salida;
  }

  public getAll(id: number): Promise<Salida[]> {
    return salidaRepository
      .createQueryBuilder('Salida')
      .where('Salida.estado = :estado', { estado: estado.ACTIVO })
      .andWhere('Salida.Trabajador.id = :id', { id: id })
      .getMany();
  }

  public async create(salida: Salida, trabajadorId: number): Promise<Salida> {
    const trabajador = await this.trabajadorService.get(trabajadorId);
    salida.Trabajador = trabajador;
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
