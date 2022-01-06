module.exports = {
  type: 'mysql',
  database: 'all_done_note',
  password: 'secret',
  username: 'takuya',
  // host:'mysql',
  port: 3306,
    seeds: ['src/users/seeds/**/*{.ts,.js}'],
    factories: ['src/users/factories/**/*{.ts,.js}'],
  }