import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { MeetingDto } from 'src/common/dto/meeting.dto';
import { User } from 'src/user/schema/user.schema';

@ObjectType()
class Host {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  fullName: string;
}

@ObjectType()
class Meeting extends MeetingDto {
  @Field()
  host: Host;
}

@ObjectType()
export class BookingResponse extends MeetingDto {
  @Field()
  _id: string;

  @Field()
  host: Host;
}

@ObjectType()
export class MyBookingsResponse extends MeetingDto {
  @Field()
  _id: string;
}

@InputType()
export class BookingFilters {
  @Field({ nullable: true })
  floor?: string;

  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  date: Date;
}

@ObjectType()
export class OngoingMeetings {
  @Field()
  _id: string;

  @Field(() => [Meeting])
  meetings: [Meeting];
}
