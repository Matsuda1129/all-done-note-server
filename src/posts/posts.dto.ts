import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  // @IsString()
  // picture: string;
}

export class EditPostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  // @IsString()
  // picture: string;
}