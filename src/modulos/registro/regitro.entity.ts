import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('registro')
export class Registro extends BaseModel {
  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'datetime', nullable: true })
  entrada: Date;

  @Column({ type: 'datetime', nullable: true })
  salida: Date;

  @ManyToOne(() => Trabajador, { nullable: false })
  Trabajador: Trabajador;
}
