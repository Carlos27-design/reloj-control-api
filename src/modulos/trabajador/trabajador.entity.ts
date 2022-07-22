import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Entrada)
  @JoinTable()
  Entradas: Entrada[];

  @ManyToMany(() => Salida)
  @JoinTable()
  Salidas: Salida[];
}
