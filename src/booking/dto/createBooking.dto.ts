import { IsString, IsDate, IsArray } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { MeetingDto } from 'src/common/dto/meeting.dto';

@InputType()
export class CreateBookingDto {
  @Field()
  eventName: string;

  @Field()
  description: string;

  @Field()
  date: Date;

  @Field()
  floor: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  notifyTime: string;

  @Field(() => [String])
  guests: string[];
}
