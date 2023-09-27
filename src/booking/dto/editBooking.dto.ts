import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MeetingDto } from 'src/common/dto/meeting.dto';

@InputType()
export class EditBookingDto {
  @Field()
  _id: string;

  @Field({ nullable: true })
  eventName: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  date: Date;

  @Field({ nullable: true })
  floor: string;

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field(() => [String], { nullable: true })
  guests: string[];
}
@ObjectType()
export class EditBookingResponse {
  @Field({ nullable: true })
  eventName: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  date: Date;

  @Field({ nullable: true })
  floor: string;

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field(() => [String], { nullable: true })
  guests: string[];
}
