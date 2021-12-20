import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'hello world',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  // @ApiProperty({
  //   example: 'aaaaaa',
  //   type: String,
  // })
  // @IsString()
  // picture: string;
}
