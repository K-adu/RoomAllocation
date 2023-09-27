import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeetingDto {
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
