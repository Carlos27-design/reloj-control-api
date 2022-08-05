import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, OneToMany } from 'typeorm';

import { Registro } from '../registro/regitro.entity';

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
}
