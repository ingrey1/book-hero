import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  // if we are running tests we use an in memory db with sqlite
  dialect: env === 'test' ? `sqlite` : process.env.DB_DIALECT,
  // the storage option is only for sqlite
  storage: env === 'test' ? ':memory:' : process.env.DB_STORAGE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  define: {
    underscore: true,
  },
  logging: false,
};
