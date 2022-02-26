import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class LikeUserIdDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class LikePostIdDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
