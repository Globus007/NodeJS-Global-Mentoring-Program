import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ?? 3000;
export const HOSTNAME = process.env.HOSTNAME ?? 'http://localhost';
export const { DB_HOST, DATABASE, DB_USER, DB_PASSWORD, DB_PORT, SECRET_KEY } = process.env;
