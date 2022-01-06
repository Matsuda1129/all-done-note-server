import { Seeder, Factory, tearDownDatabase } from 'typeorm-seeding';
import { User } from '../entities/users.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    console.log('ok')
    await factory(User)({ roles: [] }).createMany(10);
    await tearDownDatabase();
  }
}
