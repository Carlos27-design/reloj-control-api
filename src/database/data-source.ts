import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  port: 3306,
  database: 'relojcontrol',
  password: 'Desector123',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
});
