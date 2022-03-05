require('dotenv').config({ path: `.env/${process.env.NODE_ENV}.env` });

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
