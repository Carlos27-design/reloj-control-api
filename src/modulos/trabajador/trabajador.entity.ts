import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('trabajador')
export class Trabajador extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', nullable: false })
  rut: string;
}
