import { AppDataSource } from 'src/database/data-source';
import { SalidaColacion } from './salida-colacion.entity';

export const salidaColacionRepository =
  AppDataSource.getRepository(SalidaColacion);
