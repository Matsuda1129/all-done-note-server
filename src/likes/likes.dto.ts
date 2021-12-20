import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

export class LikeUserIdDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class LikePostIdDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
