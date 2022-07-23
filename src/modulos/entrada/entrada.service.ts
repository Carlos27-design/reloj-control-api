import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { TrabajadorService } from '../trabajador/trabajador.service';
import { AuthService } from '../usuario/auth/auth.service';
import { Entrada } from './entrada.entity';
import { entradaRepository } from './entrada.repository';

@Injectable()
export class EntradaService {
  constructor(private trabajadorService: TrabajadorService) {}
  public async get(id: number): Promise<Entrada> {
    const entrada = await entradaRepository
      .createQueryBuilder('Entrada')
      .where('Entrada.id = :id', { id: id })
      .andWhere('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!entrada) throw new NotFoundException();

    return entrada;
  }

  public getAll(id: number): Promise<Entrada[]> {
    return entradaRepository
      .createQueryBuilder('Entrada')
      .where('Entrada.estado = :estado', { estado: estado.ACTIVO })
      .andWhere('Entrada.Trabajador.id = :id', { id: id })
      .getMany();
  }

  public async create(
    entrada: Entrada,
    trabajadorId: number,
  ): Promise<Entrada> {
    const trabajador = await this.trabajadorService.get(trabajadorId);
    entrada.entrada = new Date();
    entrada.Trabajador = trabajador;
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
