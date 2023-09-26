import { ObjectType, Field, InputType } from '@nestjs/graphql';
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
export class BookingResponse {
  @Field()
  _id: string;

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

  @Field(() => [String])
  guests: string[];

  @Field()
  host: Host;
}

@ObjectType()
export class MyBookingsResponse {
  @Field()
  _id: string;

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

  @Field(() => [String])
  guests: string[];
}

@InputType()
export class BookingFilters {
  @Field({ nullable: true })
  floor?: string;

  @Field(() => Date, { defaultValue: new Date(), nullable: true })
  date: Date;
}
