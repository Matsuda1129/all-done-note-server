import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FlashDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
