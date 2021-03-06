import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { FollowersModule } from './followers/followers.module';
import { TodosModule } from './todo/todos.module';
import { InformationModule } from './information/information.module';
import { CommentsModule } from './comments/comments.module';
import { MailsModule } from './mails/mails.module';
import { FlashesModule } from './flashes/flashes.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`, '.env/prod.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    PostsModule,
    LikesModule,
    FollowersModule,
    TodosModule,
    InformationModule,
    CommentsModule,
    MailsModule,
    FlashesModule,
  ],
})
export class AppModule {}
