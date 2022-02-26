import { define } from 'typeorm-seeding';
import { Todo } from '../entities/todos.entity';
import Faker from 'faker';

define(Todo, (faker: typeof Faker) => {
  const groupArry = ['お金', 'やりたいこと', '準備'];
  const groupOne = groupArry[Math.floor(Math.random() * groupArry.length)];
  const moneyArry = [
    '生活費',
    '家賃',
    '結婚',
    '介護',
    '投資',
    '車',
    '出産',
    '緊急資金',
    '食費',
    '衣服',
  ];
  const todoArry = [
    '旅行',
    'アニメ',
    'ゲーム',
    '筋トレ',
    '野球',
    'サッカー',
    '登山',
    'キャンプ',
    '料理',
    '家庭菜園',
    '英語',
  ];
  const preparationArry = ['葬儀', '学費', '保険', '資産相続', '遺書', '身辺整理', '家族生活費'];
  const finished = [true, false];
  let genreOne;
  if (groupOne === 'お金') {
    genreOne = moneyArry[Math.floor(Math.random() * moneyArry.length)];
  } else if (groupOne === 'やりたいこと') {
    genreOne = todoArry[Math.floor(Math.random() * todoArry.length)];
  } else if (groupOne === '準備') {
    genreOne = preparationArry[Math.floor(Math.random() * preparationArry.length)];
  }

  const todos = new Todo();
  todos.userId = faker.random.number({ min: 1, max: 500 });
  todos.group = groupOne;
  todos.genre = genreOne;
  todos.finished = finished[Math.floor(Math.random() * finished.length)];
  todos.listname = faker.lorem.words();
  todos.money = faker.random.number({ min: 1000, max: 100000 });
  return todos;
});
