import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBookingDto {
  @Field()
  _id: string;
}
