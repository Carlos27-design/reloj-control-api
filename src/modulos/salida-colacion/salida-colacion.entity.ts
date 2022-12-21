import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('salida-colacion')
export class SalidaColacion extends BaseModel {
  @Column({ type: 'boolean', nullable: false })
  botonEstado: boolean;
}
