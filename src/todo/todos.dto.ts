import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  group: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsString()
  listname: string;

  @IsNotEmpty()
  @IsBoolean()
  finished: boolean;

  @IsNotEmpty()
  @IsBoolean()
  lock: boolean;

  @IsNotEmpty()
  @IsBoolean()
  before_die: boolean;

  @IsNumber()
  money: number;

  @IsString()
  memo: string;
}

export class TodoGenreDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  group: string;

  @IsNotEmpty()
  @IsString()
  genre: string;
}
export class TodoGenreFinishDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  group: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsBoolean()
  finished: boolean;
}
export class TodoGroupDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  group: string;
}
