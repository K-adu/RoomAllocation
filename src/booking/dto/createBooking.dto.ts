import { IsString, IsDate, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  eventName: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  floor: string;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsDate()
  notifyTime: Date;

  @ApiProperty()
  @IsArray()
  guests: string[];
}
