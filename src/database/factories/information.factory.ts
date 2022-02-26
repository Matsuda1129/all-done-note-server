import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Information } from '../entities/information.entity';

define(Information, (faker: typeof Faker) => {
  const genreArry = ['収入', '旅行', '趣味', 'やりたいこと', '葬儀', '学費', '保険'];
  let genreOne;
  genreOne = genreArry[Math.floor(Math.random() * genreArry.length)];
  const information = new Information();
  information.content = faker.lorem.paragraph();
  information.url = faker.lorem.sentence();
  information.title = faker.lorem.sentence();
  information.genre = genreOne;
  return information;
});
