import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  ssl: process.env.STAGE === 'prod',
  extra: {
    ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
});
