import { IsNotEmpty, IsNumber } from 'class-validator';

export class FollowerDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  followerId: number;
}

export class FollowerCountDto {
  @IsNotEmpty()
  @IsNumber()
  followerId: number;
}

export class FollowingCountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
