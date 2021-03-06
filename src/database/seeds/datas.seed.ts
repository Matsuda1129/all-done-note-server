import { User } from '../entities/users.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { PostEntity } from '../entities/posts.entity';
import { Like } from '../entities/likes.entity';
import { Follower } from '../entities/followers.entity';
import { Todo } from '../entities/todos.entity';
import { Information } from '../entities/information.entity';
import { Comment } from '../entities/comments.entity';
import { Mail } from '../entities/mails.entity';

export default class CreateDate implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(500);
    await factory(PostEntity)().createMany(1000);
    await factory(Like)().createMany(10000);
    await factory(Follower)().createMany(10000);
    await factory(Todo)().createMany(10000);
    await factory(Information)().createMany(10);
    await factory(Comment)().createMany(10000);
    await factory(Mail)().createMany(10000);
  }
}
