import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('entrada')
export class Entrada extends BaseModel {
  @Column({ type: 'datetime', nullable: false })
  entrada: Date;
}
