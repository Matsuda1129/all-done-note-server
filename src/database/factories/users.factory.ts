import { User } from '../entities/users.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const sex = ['man', 'woman', 'other'];
  const picture = [
    'banana.jpeg',
    'book.png',
    'cathle.jpeg',
    'cherry.jpeg',
    'chesu.jpeg',
    'followericon.jpeg',
    'smallanimal.png',
    'taihu.jpeg',
    'zyouro.jpeg',
  ];
  const jobs = [
    '農林業・水産業・鉱業',
    '建設・土木・工業',
    '電子部品・デバイス・電子回路製造業',
    '情報通信機械器具製造業',
    'その他製造業',
    '電気・ガス・熱供給・水道業',
    '通信業',
    '情報サービス業',
    'その他の情報通信業',
    '運輸業・郵便業',
    '卸売業・小売業',
    '金融業・保険業',
    '不動産業・物品賃貸業',
    '学術研究・専門技術者',
    '宿泊業・飲食サービス業',
    '生活関連サービス業・娯楽業',
    '教育・学習支援業',
    '医療・福祉業',
    '複合サービス業',
    'その他サービス業',
  ];

  const user = new User();
  user.name = `${firstName}`;
  user.password = 'aaaaaaa';
  user.gender = sex[Math.floor(Math.random() * sex.length)];
  user.picture = picture[Math.floor(Math.random() * picture.length)];
  user.introduction = faker.lorem.paragraph();
  user.email = `${firstName}@gmail.com`;
  user.age = faker.random.number({ min: 1, max: 100 });
  user.job = jobs[Math.floor(Math.random() * jobs.length)];
  user.savings = faker.random.number({ min: 100000, max: 300000 });
  return user;
});
