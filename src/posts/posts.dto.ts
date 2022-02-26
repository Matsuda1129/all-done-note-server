import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  picture: string[];
}

export class EditPostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  picture: string[];
}
