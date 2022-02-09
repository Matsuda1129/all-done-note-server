import { define, factory } from 'typeorm-seeding';
import { Comment } from '../entities/comment.entity';
import Faker from 'faker';

define(Comment, (faker: typeof Faker) => {
  const comments = new Comment();
  comments.userId = faker.random.number({ min: 1, max: 100 });
  comments.postId = faker.random.number({ min: 1, max: 100 });
  comments.comment = faker.lorem.sentence();

  return comments;
});
