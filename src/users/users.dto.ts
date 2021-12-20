import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsDate,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { UserSex } from './users.enum';
import { EnumToString } from 'src/helpers/enumToString';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test1',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  alive: boolean;

  @ApiProperty({
    example: 'hogehoge',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EditUserDto {
  @ApiProperty({
    example: 'test1',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  alive: boolean;

  @ApiProperty({
    example: 'other',
    type: String,
  })
  @IsString()
  @IsEnum(UserSex, {
    message: `Plesase select from ${EnumToString(UserSex)}`,
  })
  gender: string;

  @ApiProperty({
    example: 'こんにちは',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  introduction: string;

  @ApiProperty({
    example: '2021-12-28',
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: string;
}
