import { define } from 'typeorm-seeding';
import { Todo } from '../entities/todos.entity';
import Faker from 'faker';

define(Todo, (faker: typeof Faker) => {
  const groupArry = ['お金', 'やりたいこと', '準備'];
  const groupOne = groupArry[Math.floor(Math.random() * groupArry.length)];
  const moneyArry = ['収入'];
  const todoArry = ['旅行', '趣味', 'やりたいこと'];
  const preparationArry = ['葬儀', '学費', '保険'];
  let genreOne;
  if (groupOne === 'お金') {
    genreOne = moneyArry[Math.floor(Math.random() * moneyArry.length)];
  } else if (groupOne === 'やりたいこと') {
    genreOne = todoArry[Math.floor(Math.random() * todoArry.length)];
  } else if (groupOne === '準備') {
    genreOne = preparationArry[Math.floor(Math.random() * preparationArry.length)];
  }

  const todos = new Todo();
  todos.userId = faker.random.number({ min: 1, max: 100 });
  todos.group = groupOne;
  todos.genre = genreOne;
  todos.listname = faker.lorem.words();
  todos.money = faker.random.number({ min: 1000, max: 100000 });
  return todos;
});
