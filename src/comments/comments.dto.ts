import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

// export class FollowerCountDto {
//   @IsNotEmpty()
//   @IsNumber()
//   followerId: number;
// }

// export class FollowingCountDto {
//   @IsNotEmpty()
//   @IsNumber()
//   userId: number;
// }
