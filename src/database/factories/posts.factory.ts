import { PostEntity } from '../entities/posts.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(PostEntity, (faker: typeof Faker) => {
  const post = new PostEntity();
  post.content = faker.lorem.sentence();
  post.userId = faker.random.number({ min: 1, max: 500 });
  return post;
});
