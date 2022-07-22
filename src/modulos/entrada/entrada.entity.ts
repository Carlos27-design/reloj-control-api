import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('entrada')
export class Entrada extends BaseModel {
  @Column({ type: 'datetime', nullable: false })
  entrada: Date;

  @ManyToMany(() => Trabajador, (trabajador) => trabajador.Entradas)
  Trabajadores: Trabajador[];
}
