import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, OneToMany } from 'typeorm';
import { EntradaColacion } from '../entrada-colacion/entrada-colacion.entity';
import { Entrada } from '../entrada/entrada.entity';

import { Registro } from '../registro/regitro.entity';
import { SalidaColacion } from '../salida-colacion/salida-colacion.entity';
import { Salida } from '../salida/salida.entity';

@Entity('trabajador')
export class Trabajador extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  rut: string;

  @OneToMany(() => Registro, (registro) => registro.Trabajador)
  Registros: Registro[];

  @OneToMany(() => Entrada, (entrada) => entrada.Trabajador)
  Entradas: Entrada[];

  @OneToMany(
    () => SalidaColacion,
    (salidaColacion) => salidaColacion.Trabajador,
  )
  SalidasColacion: SalidaColacion[];

  @OneToMany(
    () => EntradaColacion,
    (entradaColacion) => entradaColacion.Trabajador,
  )
  EntradasColacion: EntradaColacion[];

  @OneToMany(() => Salida, (salida) => salida.Trabajador)
  Salidas: Salida[];
}
