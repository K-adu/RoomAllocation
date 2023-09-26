import { Field, InputType, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Token {
  @Field()
  token: string;
}
