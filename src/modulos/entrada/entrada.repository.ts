import { AppDataSource } from 'src/database/data-source';
import { Entrada } from './entrada.entity';

export const entradaRepository = AppDataSource.getRepository(Entrada);
