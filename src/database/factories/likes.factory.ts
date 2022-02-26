import { Like } from '../entities/likes.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Like, (faker: typeof Faker) => {
  const like = new Like();
  like.userId = faker.random.number({ min: 1, max: 500 });
  like.postId = faker.random.number({ min: 1, max: 1000 });
  return like;
});
