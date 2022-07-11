import { AppDataSource } from 'src/database/data-source';
import { Usuario } from './usuario.entity';

export const usuarioRepository = AppDataSource.getRepository(Usuario);
