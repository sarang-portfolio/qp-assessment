import pg from 'pg';
import { Dialect, Sequelize } from 'sequelize';

const { DATABASE, HOST, DB_PORT, DB_USER, DB_PASSWORD, DIALECT } = process.env;

export const sequelize = new Sequelize(
  DATABASE as string,
  DB_USER as string,
  DB_PASSWORD,
  {
    host: HOST,
    port: Number(DB_PORT),
    dialect: (DIALECT as Dialect) || 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    dialectModule: pg,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  },
);
