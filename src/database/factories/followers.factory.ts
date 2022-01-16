import { define, factory } from 'typeorm-seeding';
import { Follower } from '../entities/followers.entity';
import Faker from 'faker';

define(Follower, (faker: typeof Faker) => {
  const followers = new Follower();
  followers.userId = faker.random.number({ min: 1, max: 100 });
  followers.followerId = faker.random.number({ min: 1, max: 100 });

  return followers;
});
