import { PostEntity } from '../entities/posts.entity';
import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../entities/users.entity';

define(PostEntity, (faker: typeof Faker) => {
  const post = new PostEntity();
  post.content = faker.lorem.sentence();
  post.userId = faker.random.number({ min:1, max: 100 });
  return post;
});
