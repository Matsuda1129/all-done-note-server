import { Like } from '../entities/likes.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Like, (faker: typeof Faker) => {
  const like = new Like();
  like.userId = faker.random.number({ min: 1, max: 100 });
  like.postId = faker.random.number({ min: 1, max: 100 });
  return like;
});
