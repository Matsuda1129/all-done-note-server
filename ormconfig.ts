module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'takuya',
  password: 'secret',
  database: 'all_done_note',
  synchronize: true,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};
