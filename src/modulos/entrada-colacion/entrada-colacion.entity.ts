import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('entrada-colacion')
export class EntradaColacion extends BaseModel {
  @Column({ type: 'boolean', nullable: false })
  botonEstado: boolean;
}
