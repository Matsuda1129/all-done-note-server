import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsBoolean()
  unread: boolean;
}

export class EditMailDto {
  @IsNotEmpty()
  @IsBoolean()
  unread: boolean;
}
