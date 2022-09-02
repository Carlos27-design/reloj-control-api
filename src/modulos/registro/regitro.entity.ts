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

  @Column({ type: 'datetime', nullable: true })
  horaExtra: Date;

  @Column({ type: 'varchar', nullable: true })
  longitudEntrada: string;

  @Column({ type: 'varchar', nullable: true })
  latitudEntrada: string;

  @Column({ type: 'varchar', nullable: true })
  longitudSalida: string;

  @Column({ type: 'varchar', nullable: true })
  latitudSalida: string;

  @Column({ type: 'varchar', nullable: true })
  latitudHoraExtra: string;

  @Column({ type: 'varchar', nullable: true })
  longitudHoraExtra: string;

  @ManyToOne(() => Trabajador, { nullable: false })
  Trabajador: Trabajador;
}
