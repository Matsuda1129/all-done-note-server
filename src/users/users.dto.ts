import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';
import { UserSex } from './users.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsBoolean()
  alive: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  alive: boolean;

  @IsString()
  @IsEnum(UserSex, {
    message: `Plesase select from ${EnumToString(UserSex)}`,
  })
  gender: string;

  @IsNotEmpty()
  @IsString()
  introduction: string;

  @IsDateString()
  birthday: string;

  @IsString()
  picture: string;

  @IsNumber()
  savings: number;

  @IsString()
  job: number;

  // @IsArray()
  // family: string;
}

export class EditUserPicture {
  @IsString()
  picture: string;
}
