import { Field, InputType, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Token {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}

@ObjectType()
export class NewAccessToken {
  @Field()
  accessToken: string;
}
