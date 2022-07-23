import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Entrada } from '../entrada/entrada.entity';
import { Salida } from '../salida/salida.entity';

@Entity('trabajador')
export class Trabajador extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  rut: string;

  @OneToMany(() => Entrada, (entrada) => entrada.Trabajador)
  Entradas: Entrada[];

  @OneToMany(() => Salida, (salida) => salida.Trabajador)
  Salidas: Salida[];
}
