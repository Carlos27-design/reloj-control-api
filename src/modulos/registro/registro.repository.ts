import { AppDataSource } from 'src/database/data-source';
import { Registro } from './regitro.entity';

export const registroRepository = AppDataSource.getRepository(Registro);
