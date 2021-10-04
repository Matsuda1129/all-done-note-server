import { IsNotEmpty, IsString, IsBoolean, IsEnum } from 'class-validator';
import { UserSex } from './user.enum';
import { EnumToString } from 'src/helpers/enumToString';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDTO {
  // 空文字NG，string型指定
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsBoolean()
  alive: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  will: string;

  @IsString()
  movie: string;

  @IsString()
  @IsEnum(UserSex, {
    message: `Plesase select from ${EnumToString(UserSex)}`,
  })
  sex: string;
}

export class EditUserDto extends PartialType(OmitType(CreateUserDTO, ['sex'] as const)) {}
