import { ObjectType, Field } from '@nestjs/graphql';
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
