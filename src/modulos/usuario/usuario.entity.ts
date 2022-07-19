import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { Trabajador } from '../trabajador/trabajador.entity';

@Entity('usuario')
export class Usuario extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  contrasena: string;

  @ManyToOne(() => Rol, (rol) => rol.Usuarios)
  Roles: Rol;

  @OneToOne(() => Trabajador)
  @JoinColumn()
  Trabajadores: Trabajador;
}
