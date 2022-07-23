import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Trabajador } from './trabajador.entity';
import { trabajadorRepository } from './trabajador.repository';

@Injectable()
export class TrabajadorService {
  public async get(id: number): Promise<Trabajador> {
    const trabajador = await trabajadorRepository
      .createQueryBuilder('Trabajador')
      .where('Trabajador.id = :id', { id: id })
      .leftJoinAndSelect(
        'Trabajador.Entradas',
        'Entrada',
        'Entrada.estado = :estadoEntrada',
        { estadoEntrada: estado.ACTIVO },
      )
      .leftJoinAndSelect(
        'Trabajador.Salidas',
        'Salida',
        'Salida.estado = :estadoSalida',
        { estadoSalida: estado.ACTIVO },
      )
      .andWhere('Trabajador.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!trabajador) throw new NotFoundException();

    return trabajador;
  }

  public getAll(): Promise<Trabajador[]> {
    return trabajadorRepository
      .createQueryBuilder('Trabajador')
      .where('Trabajador.estado = :estado', { estado: estado.ACTIVO })
      .getMany();
  }

  public create(trabajador: Trabajador): Promise<Trabajador> {
    return trabajadorRepository.save(trabajador);
  }

  public async update(id: number, trabajador: Trabajador): Promise<void> {
    let trabajadorDB = await this.get(id);

    trabajadorDB.rut = trabajador.rut;
    trabajadorDB.nombre = trabajador.nombre;
    trabajadorDB.apellido = trabajador.apellido;

    await trabajadorDB.save();
  }

  public async delete(id: number): Promise<void> {
    let trabajadorDB = await this.get(id);

    trabajadorDB.estado = estado.INACTIVO;

    await trabajadorDB.save();
  }
}
