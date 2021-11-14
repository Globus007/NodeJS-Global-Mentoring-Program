import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const PORT = process.env.PORT ?? 3000;
export const HOSTNAME = process.env.HOSTNAME ?? 'http://localhost';
export const { DB_HOST, DATABASE, DB_USER, DB_PASSWORD, DB_PORT, SECRET_KEY } = process.env;

export const sequelizeConnection = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
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
