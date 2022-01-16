import { User } from '../entities/users.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const birthday = faker.date;
  const sex = ['man', 'woman', 'other'];

  const user = new User();
  user.name = `${firstName}`;
  user.password = 'aaaaaaa';
  user.gender = sex[Math.floor(Math.random() * sex.length)];
  user.introduction = faker.lorem.sentence();
  user.email = `${firstName}@gmail.com`;
  user.age = faker.random.number({ min: 1, max: 100 });
  return user;
});
