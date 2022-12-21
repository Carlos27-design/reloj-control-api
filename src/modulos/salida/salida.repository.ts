import { AppDataSource } from 'src/database/data-source';
import { Salida } from './salida.entity';

export const salidaRepository = AppDataSource.getRepository(Salida);
