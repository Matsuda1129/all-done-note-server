import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from '../database/entities/followers.entity';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follower]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService],
})
export class FollowersModule {}
