import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('entrada')
export class Entrada extends BaseModel {
  @Column({ type: 'datetime', nullable: false })
  entrada: Date;

  @ManyToOne(() => Trabajador, { nullable: false })
  Trabajador: Trabajador;
}
