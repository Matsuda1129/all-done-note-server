import { User } from '../entities/users.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { PostEntity } from '../entities/posts.entity';
import { Like } from '../entities/likes.entity';
import { Follower } from '../entities/followers.entity';
import { Todo } from '../entities/todos.entity';

export default class CreateDate implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(100);
    await factory(PostEntity)().createMany(100);
    await factory(Like)().createMany(1000);
    await factory(Follower)().createMany(1000);
    await factory(Todo)().createMany(1000)
  }
}
