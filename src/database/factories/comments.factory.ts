import { define, factory } from 'typeorm-seeding';
import { Comment } from '../entities/comments.entity';
import Faker from 'faker';

define(Comment, (faker: typeof Faker) => {
  const comments = new Comment();
  comments.userId = faker.random.number({ min: 1, max: 500 });
  comments.postId = faker.random.number({ min: 1, max: 1000 });
  comments.comment = faker.lorem.sentence();

  return comments;
});