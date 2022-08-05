import { AppDataSource } from 'src/database/data-source';
import { Trabajador } from './trabajador.entity';

export const trabajadorRepository = AppDataSource.getRepository(Trabajador);
