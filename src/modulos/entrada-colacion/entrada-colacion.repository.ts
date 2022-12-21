import { AppDataSource } from 'src/database/data-source';
import { EntradaColacion } from './entrada-colacion.entity';

export const entradaColacionRepository =
  AppDataSource.getRepository(EntradaColacion);
