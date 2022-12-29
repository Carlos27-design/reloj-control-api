import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('salida')
export class Salida extends BaseModel {
  @Column({ type: 'boolean', nullable: false })
  botonEstado: boolean;

  @ManyToOne(() => Trabajador, { nullable: false })
  Trabajador: Trabajador;
}
