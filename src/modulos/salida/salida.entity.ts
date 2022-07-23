import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('salida')
export class Salida extends BaseModel {
  @Column({ type: 'datetime', nullable: false })
  salida: Date;

  @ManyToOne(() => Trabajador, { nullable: false })
  Trabajador: Trabajador;
}
