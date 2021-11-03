import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  picture: string;
}
