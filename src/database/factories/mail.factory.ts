import { define, factory } from 'typeorm-seeding';
import { Mail } from '../entities/mails.entity';
import Faker from 'faker';

let count = 0;
const userIdArray = [];
const recipientIdArray = [];
const titleArray = [];
const messageArray = [];
define(Mail, (faker: typeof Faker) => {
  const userIdNumber = faker.random.number({ min: 1, max: 100 });
  const recipientIdNumber = faker.random.number({ min: 1, max: 100 });
  const title = faker.lorem.sentence(1);
  const message = faker.lorem.paragraph();

  const userMail = new Mail();
  userMail.ownerId = userIdNumber;
  userMail.userId = userIdNumber;
  userMail.recipientId = recipientIdNumber;
  userMail.title = title;
  userMail.message = message;
  userMail.unread = false;

  if (count < 1) {
    count += 1;
    userIdArray.push(userIdNumber);
    recipientIdArray.push(recipientIdNumber);
    titleArray.push(title);
    messageArray.push(message);

    return userMail;
  } else {
    const recipientMail = new Mail();
    recipientMail.ownerId = recipientIdArray[0];
    recipientMail.userId = userIdArray[0];
    recipientMail.recipientId = recipientIdArray[0];
    recipientMail.title = titleArray[0];
    recipientMail.message = messageArray[0];
    recipientMail.unread = false;

    userIdArray.length = 0;
    recipientIdArray.length = 0;
    titleArray.length = 0;
    messageArray.length = 0;
    count -= 1;
    return recipientMail;
  }
});
