import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('rol')
export class Rol extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  rol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.Roles)
  Usuarios: Usuario[];
}
