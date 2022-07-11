import { BaseModel } from 'src/shared/base-model';
import { Column, Entity } from 'typeorm';

@Entity('usuario')
export class Usuario extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  nombreUsuario: string;

  @Column({ type: 'varchar', nullable: false })
  contrasena: string;
}
