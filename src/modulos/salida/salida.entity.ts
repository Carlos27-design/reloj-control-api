import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('salida')
export class Salida extends BaseModel {
  @Column({ type: 'datetime', nullable: false })
  salida: Date;
}
