import { Like } from '../entities/likes.entity';
import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../entities/users.entity';
import { PostEntity } from '../entities/posts.entity';

define(Like, (faker: typeof Faker) => {
  const like = new Like();
  like.userId = faker.random.number({ min: 1, max: 100 });
  like.postId = faker.random.number({ min: 1, max: 100 });
  return like;
});
