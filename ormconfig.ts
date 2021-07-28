import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { Task } from './src/entities/Task';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Task],
  logging: false,
};

module.exports = {
  ...ormConfig,
  seeds: [path.resolve(__dirname, './src/database/seeds/**/*{.ts,.js}')],
  migrations: [path.resolve(__dirname, './src/database/migrations/*.ts')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  factories: [
    path.resolve(__dirname, './src/database/factories/**/*{.ts,.js}'),
  ],
};
