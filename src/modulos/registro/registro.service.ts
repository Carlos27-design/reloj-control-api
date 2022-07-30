import { Injectable, NotFoundException } from '@nestjs/common';
import { estado } from 'src/shared/estado.enum';
import { Trabajador } from '../trabajador/trabajador.entity';
import { TrabajadorService } from '../trabajador/trabajador.service';
import { registroRepository } from './registro.repository';
import { Registro } from './regitro.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegistroService {
  constructor(
    private trabajadorService: TrabajadorService,
    private readonly _configService: ConfigService,
  ) {}
  async get(id: number): Promise<Registro> {
    const registro = await registroRepository
      .createQueryBuilder('Registro')
      .leftJoinAndSelect('Registro.Trabajador', 'Trabajador')
      .where('Registro.id = :id', { id: id })
      .andWhere('Registro.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!registro) throw new NotFoundException();

    return registro;
  }

  getAll(id: number): Promise<Registro[]> {
    return registroRepository
      .createQueryBuilder('Registro')
      .leftJoinAndSelect('Registro.Trabajador', 'Trabajador')
      .where('Registro.estado = :estado', { estado: estado.ACTIVO })
      .andWhere('Trabajador.id = :id', { id: id })
      .getMany();
  }

  async create(registro: Registro, trabajadorId: number): Promise<Registro> {
    const trabajador = await this.trabajadorService.get(trabajadorId);
    registro.Trabajador = trabajador;
    registro.fecha = new Date(registro.fecha);
    let registroNuevo = await this.getRegistroHoy(trabajador, registro.fecha);
    if (registro.entrada) {
      registroNuevo.entrada = new Date(registro.entrada);
    }
    if (registro.salida) {
      registroNuevo.salida = new Date(registro.salida);
    }

    return await registroNuevo.save();
  }

  async update(id: number, registro: Registro): Promise<void> {
    let registroDB = await this.get(id);
    registroDB.entrada = registro.entrada;
    registroDB.salida = registro.salida;

    await registroDB.save();
  }

  async delete(id: number): Promise<void> {
    let registroDB = await this.get(id);

    registroDB.estado = estado.INACTIVO;

    await registroDB.save();
  }

  private async getRegistroHoy(
    trabajador: Trabajador,
    fecha: Date,
  ): Promise<Registro> {
    let cadena = fecha.toISOString().slice(0, 10);
    const registro = await registroRepository
      .createQueryBuilder('Registro')
      .where('Registro.Trabajador.id = :trabajadorId', {
        trabajadorId: trabajador.id,
      })
      .andWhere('Registro.fecha = :fecha', { fecha: cadena })
      .andWhere('Registro.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!registro) {
      let registroNuevo = new Registro();
      registroNuevo.Trabajador = trabajador;
      registroNuevo.fecha = fecha;
      return registroRepository.save(registroNuevo);
    }

    return registro;
  }
}
