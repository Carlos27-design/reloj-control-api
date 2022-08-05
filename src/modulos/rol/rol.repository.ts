import { AppDataSource } from 'src/database/data-source';
import { Rol } from './rol.entity';

export const rolRepository = AppDataSource.getRepository(Rol);
