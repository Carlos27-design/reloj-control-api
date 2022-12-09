import { Injectable, NotFoundException } from '@nestjs/common';

import { estado } from 'src/shared/estado.enum';
import { Trabajador } from '../trabajador/trabajador.entity';
import { Registro } from './regitro.entity';

import { TrabajadorService } from '../trabajador/trabajador.service';
import { BusquedaRangoFecha } from './busquedaRangoFecha';
import { registroRepository } from './registro.repository';

@Injectable()
export class RegistroService {
  constructor(private trabajadorService: TrabajadorService) {}
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

  async getUltimoRegistro(trabajadorId: number): Promise<Registro> {
    const registro = await registroRepository
      .createQueryBuilder('Registro')
      .leftJoinAndSelect('Registro.Trabajador', 'Trabajador')
      .where('Trabajador.id = :id', { id: trabajadorId })
      .andWhere('Registro.estado = :estado', { estado: estado.ACTIVO })
      .orderBy('Registro.id', 'DESC')
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
      registroNuevo.latitudEntrada = registro.latitudEntrada;
      registroNuevo.longitudEntrada = registro.longitudEntrada;
    }

    if (registro.salida) {
      registroNuevo.salida = new Date(registro.salida);
      registroNuevo.latitudSalida = registro.latitudSalida;
      registroNuevo.longitudSalida = registro.longitudSalida;
    }

    if (registro.entradaColacion) {
      registroNuevo.entradaColacion = new Date(registro.entradaColacion);
      registroNuevo.latitudEntradaColacion = registro.latitudEntradaColacion;
      registroNuevo.longitudEntradaColacion = registro.longitudEntradaColacion;
    }

    if (registro.salidaColacion) {
      registroNuevo.salidaColacion = new Date(registro.salidaColacion);
      registroNuevo.latitudSalidaColacion = registro.latitudSalidaColacion;
      registroNuevo.longitudSalidaColacion = registro.longitudSalidaColacion;
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

  private async getRegistroHoy(trabajador: Trabajador, fecha: Date) {
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
      return await registroRepository.save(registroNuevo);
    }

    return registro;
  }

  public async getByDateInRange(id: number, rangoFecha: BusquedaRangoFecha) {
    const registrosOnDate: Registro[] = await registroRepository
      .createQueryBuilder('Registro')
      .where('Registro.estado = :estado', { estado: estado.ACTIVO })
      .andWhere('Registro.Trabajador.id = :id', { id: id })
      .andWhere('Registro.fecha BETWEEN :start_range AND :end_range', {
        start_range: rangoFecha.inicio,
        end_range: rangoFecha.fin,
      })
      .getMany();
    let registros: Registro[] = [];

    for (let i = 0; i < registrosOnDate.length; i++) {
      const registro = registrosOnDate[i];
      registros.push(await this.get(registro.id));
    }

    return registros;
  }

  public async getByDateInRangeUser(
    trabajadorId: number,
    rangoFecha: BusquedaRangoFecha,
  ) {
    const registrosOnDate: Registro[] = await registroRepository
      .createQueryBuilder('Registro')
      .leftJoinAndSelect('Registro.Trabajador', 'Trabajador')
      .where('Registro.estado = :estado', { estado: estado.ACTIVO })
      .andWhere('Trabajador.id = :id', { id: trabajadorId })
      .andWhere('Registro.fecha BETWEEN :start_range AND :end_range', {
        start_range: rangoFecha.inicio,
        end_range: rangoFecha.fin,
      })
      .getMany();

    let registros: Registro[] = [];

    for (let i = 0; i < registrosOnDate.length; i++) {
      const registro = registrosOnDate[i];
      registros.push(await this.get(registro.id));
    }

    return registros;
  }

  public async getFecha(fecha: Registro): Promise<Registro> {
    let fechas = new Date(fecha.fecha);

    const cadena = fechas.toISOString().slice(0, 10);

    const registro = await registroRepository
      .createQueryBuilder('Registro')
      .where('Registro.fecha = :fecha', { fecha: cadena })
      .andWhere('Registro.estado = :estado', { estado: estado.ACTIVO })
      .getOne();

    if (!registro) throw new NotFoundException();

    return registro;
  }
}
