import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
import { UserModule } from './user/user.module';

=======
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
>>>>>>> Stashed changes
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'all-done-note-dev-mysql-standalone.crrujeakot0e.ap-northeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'qloOMUPsXbtPL6Pm',
      database: 'tastylog',
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
<<<<<<< Updated upstream
    UserModule,
=======
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
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
