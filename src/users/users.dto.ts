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

  @IsBoolean()
  alone: boolean;

  @IsBoolean()
  isMarried: boolean;

  @IsBoolean()
  isChild: boolean;

  @IsBoolean()
  isChildren2: boolean;

  @IsBoolean()
  isChildren3: boolean;

  @IsBoolean()
  isParents: boolean;

  @IsBoolean()
  isSpouseParents: boolean;

  @IsBoolean()
  isOthers: boolean;

  @IsBoolean()
  openData: boolean;

  @IsBoolean()
  openDataAfterDie: boolean;
}

export class EditUserPicture {
  @IsString()
  picture: string;
}
export class EditUserTodo {
  @IsNumber()
  goalMoney1: number;

  @IsNumber()
  goalMoney2: number;

  @IsNumber()
  allPercent: number;

  @IsNumber()
  moneyPercent: number;

  @IsNumber()
  preparationPercent: number;

  @IsNumber()
  todoPercent: number;
}
