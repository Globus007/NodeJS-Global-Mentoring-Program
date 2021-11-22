import { Sequelize } from 'sequelize';
import { DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

export const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
  port: Number(DB_PORT),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
