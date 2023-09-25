import { IsString, IsDate, IsArray } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  eventName: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  floor: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsDate()
  notifyTime: Date;

  @IsArray()
  guests: string[];
}
